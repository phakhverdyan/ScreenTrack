const mix = require('laravel-mix');

// ---------------------------------------------------------------------- //

mix.webpackConfig({
	devtool: 'inline-source-map',
}).sourceMaps().options({
	fileLoaderDirs: {
		images: 'css-img',
		fonts: 'fonts',
    },
}).version();

// ---------------------------------------------------------------------- //
//
// Styles
//
// ---------------------------------------------------------------------- //

mix.sass('resources/scss/vendor/pageintro.scss', 'public/css/vendor/pageintro.css');
mix.copy('resources/scss/vendor/animate.css', 'public/css/vendor/animate.css');
mix.copy('resources/scss/vendor/aos.css', 'public/css/vendor/aos.css');
mix.sass('node_modules/bootstrap/scss/bootstrap.scss', 'public/css/vendor');
mix.copy('resources/scss/vendor/croppie.css', 'public/css/vendor/croppie.css');
mix.copy('resources/scss/vendor/jquery-ui.min.css', 'public/css/vendor/jquery-ui.min.css');
mix.copy('resources/scss/vendor/owl.carousel.min.css', 'public/css/vendor/owl.carousel.min.css');
mix.copy('resources/scss/vendor/selectize.bootstrap3.min.css', 'public/css/vendor/selectize.bootstrap3.min.css');

mix.sass('resources/scss/vendor/animate.modified.scss', 'public/css/vendor');
mix.sass('resources/scss/vendor/selectize.modified.scss', 'public/css/vendor');

mix.sass('resources/scss/main.scss', 'public/css');
mix.sass('resources/scss/setup.scss', 'public/css');
mix.sass('resources/scss/stripe.scss', 'public/css');
mix.sass('resources/scss/login.scss', 'public/css');
mix.sass('resources/scss/landing2.scss', 'public/css');
mix.sass('resources/scss/interview-completed.scss', 'public/css');
mix.sass('resources/scss/help-center-styles.scss', 'public/css');
mix.sass('resources/scss/contact-us.scss', 'public/css');
mix.sass('resources/scss/affiliates.scss', 'public/css');

mix.sass('resources/scss/dashboard/main.old.scss', 'public/css/dashboard');
mix.sass('resources/scss/dashboard/main.scss', 'public/css/dashboard');
mix.sass('resources/scss/dashboard/style.scss', 'public/css/dashboard');

mix.sass('resources/scss/interview/main.scss', 'public/css/interview');

// ---------------------------------------------------------------------- //
//
// Scripts
//
// ---------------------------------------------------------------------- //

mix.copy('node_modules/jquery/dist/jquery.min.js', 'public/js/vendor/jquery.min.js');
mix.copy('resources/js/vendor/aos.js', 'public/js/vendor/aos.js');
mix.copy('resources/js/vendor/bootstrap.min.js', 'public/js/vendor/bootstrap.min.js');
mix.copy('resources/js/vendor/chart.min.js', 'public/js/vendor/chart.min.js');
mix.copy('resources/js/vendor/croppie.min.js', 'public/js/vendor/croppie.min.js');
mix.copy('resources/js/vendor/ejs.min.js', 'public/js/vendor/ejs.min.js');
mix.copy('resources/js/vendor/jquery-ui.min.js', 'public/js/vendor/jquery-ui.min.js');
mix.copy('resources/js/vendor/jquery.mask.min.js', 'public/js/vendor/jquery.mask.min.js');
mix.copy('resources/js/vendor/jquery.mousewheel.min.js', 'public/js/vendor/jquery.mousewheel.min.js');
mix.copy('resources/js/vendor/moment.js', 'public/js/vendor/moment.js');
mix.copy('resources/js/vendor/notify.js', 'public/js/vendor/notify.js');
mix.copy('resources/js/vendor/owl.carousel.min.js', 'public/js/vendor/owl.carousel.min.js');
mix.copy('resources/js/vendor/selectize.min.js', 'public/js/vendor/selectize.min.js');
mix.copy('resources/js/vendor/socket.io.js', 'public/js/vendor/socket.io.js');
mix.copy('resources/js/vendor/utils.js', 'public/js/vendor/utils.js');
mix.copy('resources/js/vendor/pageintro.js', 'public/js/vendor/pageintro.js');

mix.js('resources/js/main.js', 'public/js/main.js');
mix.js('resources/js/realtime.js', 'public/js/realtime.js');

mix.js('resources/js/behavior/gs.js', 'public/js/behavior/gs.js');
mix.js('resources/js/behavior/main.js', 'public/js/behavior/main.js');

mix.js('resources/js/dashboard/board.js', 'public/js/dashboard/board.js');
mix.js('resources/js/dashboard/main.js', 'public/js/dashboard/main.js');
mix.js('resources/js/dashboard/messenger.js', 'public/js/dashboard/messenger.js');
mix.js('resources/js/dashboard/timeline.js', 'public/js/dashboard/timeline.js');

mix.js('resources/js/landing/main_v1.js', 'public/js/landing/main_v1.js');

mix.js('resources/js/modals/*.js', 'public/js/modals.js');
mix.js('resources/js/popovers/*.js', 'public/js/popovers.js');
mix.js('resources/js/slideups/*.js', 'public/js/slideups.js');
