<?php

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function run()
    {
        $client = new GuzzleHttp\Client;
        $response = $client->request('GET', 'https://restcountries.eu/rest/v2/');
        $response_countries = GuzzleHttp\json_decode($response->getBody()->getContents());
        $response_languages = [];
        // Language::where('code', null)->delete();
        Language::truncate();

        foreach ($response_countries as $response_country) {
            foreach ($response_country->languages as $response_language) {
                if (isset($response_languages[$response_language->iso639_2])) {
                    continue;
                }

                $response_languages[$response_language->iso639_2] = $response_language;
            }
        }

        ksort($response_languages);

        foreach ($response_languages as $response_language) {
            if (!$response_language->iso639_1) {
                continue;
            }

            if (!$language = Language::where('code', $response_language->iso639_2)->first()) {
                $language = new Language();
            }

            $language->name = $response_language->name;
            $language->native_name = $response_language->nativeName;
            $language->code = $response_language->iso639_1;
            $language->save();
        }

        echo 'The `languages` table were seeded successfully.' . "\n";
    }
}
