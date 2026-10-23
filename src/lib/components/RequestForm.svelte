<script lang="ts">
	import { tick } from 'svelte';
	import type { Journey } from '#lib/data/journeys.ts';
	import { endDate, formatDayMonth, formatLongDate, formatPrice } from '#lib/format.ts';

	let { journey, departure = $bindable(null) }: { journey: Journey; departure?: string | null } =
		$props();

	let travellers = $state(2);
	let name = $state('');
	let email = $state('');
	let note = $state('');
	let attempted = $state(false);
	let reference = $state<string | null>(null);
	let confirmation = $state<HTMLElement>();

	const chosen = $derived(journey.departures.find((d) => d.start === departure) ?? null);
	const seatLimit = $derived(Math.min(chosen?.seatsLeft ?? journey.maxGuests, 6));
	const errors = $derived({
		departure: chosen ? null : 'Choose a departure.',
		travellers:
			Number.isInteger(travellers) && travellers >= 1 && travellers <= seatLimit
				? null
				: `Between 1 and ${String(seatLimit)} on this departure.`,
		name: name.trim().length >= 2 ? null : 'Tell us your name.',
		email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? null : 'An email we can reply to.'
	});
	const valid = $derived(Object.values(errors).every((error) => error === null));
	const show = (key: keyof typeof errors) => (attempted ? (errors[key] ?? '') : '');

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		attempted = true;
		if (!valid) {
			const first = (Object.keys(errors) as (keyof typeof errors)[]).find((key) => errors[key]);
			if (first) document.getElementById(`request-${first}`)?.focus();
			return;
		}
		reference = `AUR-${crypto.randomUUID().slice(0, 5).toUpperCase()}`;
		await tick();
		confirmation?.focus();
	}

	const field =
		'mt-2 w-full border-0 border-b border-hair bg-transparent px-0 py-2.5 text-base text-bone outline-none transition-colors focus:border-gold aria-[invalid=true]:border-alert';
</script>

{#if reference && chosen}
	<div
		bind:this={confirmation}
		tabindex="-1"
		class="border border-gold p-8 outline-none"
		role="status"
	>
		<p class="font-mono text-xs text-gold">{reference} · HELD 48 H</p>
		<h3 class="display mt-5 text-4xl">Your places are held, {name.trim().split(' ')[0]}.</h3>
		<p class="mt-5 max-w-lg leading-relaxed text-bone/80">
			{travellers}
			{travellers === 1 ? 'place' : 'places'} on {journey.name}, from {formatLongDate(
				chosen.start
			)}. A planner will write to {email.trim()} within one working day.
		</p>
		<p class="mt-6 font-mono text-xs text-mist">
			Portfolio piece: nothing was sent, nothing is held.
		</p>
	</div>
{:else}
	<form novalidate onsubmit={submit} class="grid gap-8">
		<fieldset aria-describedby="departure-error">
			<legend class="label">Departure</legend>
			<div class="mt-3 grid gap-2 sm:grid-cols-2">
				{#each journey.departures as option, index (option.start)}
					<label class="block">
						<input
							type="radio"
							name="departure"
							id={index === 0 ? 'request-departure' : undefined}
							class="peer sr-only"
							value={option.start}
							bind:group={departure}
						/>
						<span
							class="flex cursor-pointer items-baseline justify-between gap-3 border border-hair px-4 py-3 font-mono text-sm
								transition-colors peer-checked:border-gold peer-checked:text-gold peer-focus-visible:outline-1
								peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold
								peer-[:not(:checked)]:hover:border-bone/40"
						>
							<span
								>{formatDayMonth(option.start)} – {formatDayMonth(
									endDate(option.start, journey.days)
								)}</span
							>
							<span class="text-xs {option.seatsLeft <= 3 ? 'text-alert' : 'text-mist'}">
								{option.seatsLeft} left
							</span>
						</span>
					</label>
				{/each}
			</div>
			<p id="departure-error" class="mt-2 text-sm text-alert">{show('departure')}</p>
		</fieldset>

		<div class="grid gap-8 sm:grid-cols-[8rem_1fr]">
			<label class="block label">
				Travellers
				<input
					type="number"
					id="request-travellers"
					min="1"
					max={seatLimit}
					bind:value={travellers}
					class="{field} font-mono"
					aria-invalid={attempted && errors.travellers !== null}
					aria-describedby="travellers-error"
				/>
				<span
					id="travellers-error"
					class="mt-2 block text-sm tracking-normal text-alert normal-case"
					>{show('travellers')}</span
				>
			</label>
			<label class="block label">
				Name
				<input
					type="text"
					id="request-name"
					autocomplete="name"
					bind:value={name}
					class={field}
					aria-invalid={attempted && errors.name !== null}
					aria-describedby="name-error"
				/>
				<span id="name-error" class="mt-2 block text-sm tracking-normal text-alert normal-case"
					>{show('name')}</span
				>
			</label>
		</div>

		<label class="block label">
			Email
			<input
				type="email"
				id="request-email"
				autocomplete="email"
				bind:value={email}
				class={field}
				aria-invalid={attempted && errors.email !== null}
				aria-describedby="email-error"
			/>
			<span id="email-error" class="mt-2 block text-sm tracking-normal text-alert normal-case"
				>{show('email')}</span
			>
		</label>

		<label class="block label">
			Anything we should know <span class="text-mist/60">(optional)</span>
			<textarea rows="2" bind:value={note} class="{field} resize-y"></textarea>
		</label>

		<div class="flex flex-wrap items-center justify-between gap-6 border-t border-hair pt-6">
			<p class="font-mono text-sm text-mist">
				{travellers} × {formatPrice(journey.pricePerPerson)} =
				<span class="text-lg text-bone"
					>{formatPrice(Math.max(travellers, 0) * journey.pricePerPerson)}</span
				>
			</p>
			<button
				type="submit"
				class="bg-gold px-8 py-4 font-medium text-night transition-colors hover:bg-bone"
			>
				Hold my places
			</button>
		</div>
	</form>
{/if}
