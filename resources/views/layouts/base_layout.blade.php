<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
	<meta charset="utf-8">
	@stack('meta')
	@yield('head')
	@stack('styles')
</head>
<body{!! attribute_array_to_string($body ?? []) !!}>
	@yield('body')
    @stack('modals')
	@stack('scripts')
	@stack('ejs-templates')
</body>
</html>