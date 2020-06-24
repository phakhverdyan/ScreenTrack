@push('scripts')
	<script>
		$(function() {
			$('#referral_link_copy_button').click(function(event) {
				event.preventDefault();
				copy_text_to_clipboard($('#referral_link_input').val());
				$.notify('Copied!', 'success');
			});
		});
	</script>
@endpush

<div class="mb-3">
	<p class="mb-2">{!! __('dashboard/referrals.your_referral_link') !!}</p>
	<div style="position: relative;">
		<input class="form-control" value="{{ route('index') }}?{{ auth()->user()->id ?? '0' }}" id="referral_link_input">
		<button class="btn btn-primary btn-sm" style="position: absolute; top: 4px; right: 4px; height: 30px;" id="referral_link_copy_button">Copy</button>
	</div>
</div>
