---
title: API Reference

language_tabs:
- bash
- javascript

includes:

search: true

toc_footers:
- <a href='http://github.com/mpociot/documentarian'>Documentation Powered by Documentarian</a>
---
<!-- START_INFO -->
# Info

Welcome to the generated API reference.
[Get Postman Collection](http://loc.screentrack.com/docs/collection.json)

<!-- END_INFO -->

#Authorization


Class AuthController
<!-- START_7d3c2db147883a30b324c3385090a0fc -->
## api/register
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/register" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/register"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
{
    "data": {
        "email_success": false,
        "slug_success": true,
        "suggested_user_slug": null,
        "validation_messages": {
            "user": [
                "The user field is required."
            ],
            "user.email": [
                "The user.email field is required."
            ]
        },
        "user": null
    }
}
```

### HTTP Request
`GET api/register`

`POST api/register`

`PUT api/register`

`PATCH api/register`

`DELETE api/register`

`OPTIONS api/register`


<!-- END_7d3c2db147883a30b324c3385090a0fc -->

<!-- START_428e1ef10265a9a6bc04713e2cac672f -->
## api/is_user_registered
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/is_user_registered" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/is_user_registered"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (422):

```json
{
    "error": "Validation",
    "validation_fields": {
        "user.email": [
            "The user.email field is required."
        ]
    }
}
```

### HTTP Request
`GET api/is_user_registered`

`POST api/is_user_registered`

`PUT api/is_user_registered`

`PATCH api/is_user_registered`

`DELETE api/is_user_registered`

`OPTIONS api/is_user_registered`


<!-- END_428e1ef10265a9a6bc04713e2cac672f -->

<!-- START_91c3c36e3b9219b370a769c294e6ed2c -->
## Login
Login in User&#039;s account

> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/login" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"user":{"email":"accusantium","password":"consequuntur"}}'

```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/login"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "user": {
        "email": "accusantium",
        "password": "consequuntur"
    }
}

fetch(url, {
    method: "GET",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
{
    "data": {
        "id": 13879,
        "slug": "klarissa",
        "skype": null,
        "hourly_rate": null,
        "website_url": null,
        "first_name": "Klarissa",
        "last_name": "Petrovna",
        "professional_title": "A",
        "professional_description": null,
        "timezone": null,
        "utc_offset": 0,
        "is_online": true,
        "country_code": "RU",
        "affiliate_mode": "SUPER",
        "ad_campaign_id": null,
        "short_name": "Klarissa P.",
        "full_name": "Klarissa Petrovna",
        "title": "Klarissa Petrovna",
        "short_title": "Klarissa P."
    }
}
```

### HTTP Request
`GET api/login`

`POST api/login`

`PUT api/login`

`PATCH api/login`

`DELETE api/login`

`OPTIONS api/login`

#### Body Parameters
Parameter | Type | Status | Description
--------- | ------- | ------- | ------- | -----------
    `user` | object |  required  | 
        `user.email` | email |  required  | 
        `user.password` | string |  required  | 
    
<!-- END_91c3c36e3b9219b370a769c294e6ed2c -->

<!-- START_2d407adff972f76d2c0ab26668a9e76a -->
## api/reset_password
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/reset_password" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/reset_password"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (422):

```json
{
    "error": "Validation",
    "validation_fields": {
        "user.email": [
            "The user.email field is required."
        ]
    }
}
```

### HTTP Request
`GET api/reset_password`

`POST api/reset_password`

`PUT api/reset_password`

`PATCH api/reset_password`

`DELETE api/reset_password`

`OPTIONS api/reset_password`


<!-- END_2d407adff972f76d2c0ab26668a9e76a -->

<!-- START_25d03a580a886070ad0df3194ff41929 -->
## api/reset_password/{password_reset_token}
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/reset_password/1" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/reset_password/1"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (404):

```json
{
    "error": "Not Found"
}
```

### HTTP Request
`GET api/reset_password/{password_reset_token}`

`POST api/reset_password/{password_reset_token}`

`PUT api/reset_password/{password_reset_token}`

`PATCH api/reset_password/{password_reset_token}`

`DELETE api/reset_password/{password_reset_token}`

`OPTIONS api/reset_password/{password_reset_token}`


<!-- END_25d03a580a886070ad0df3194ff41929 -->

#general


<!-- START_d380132dd2bca9419c96afa059f03adf -->
## api/sign_up/choose_a_plan
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/sign_up/choose_a_plan" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/sign_up/choose_a_plan"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/sign_up/choose_a_plan`

`POST api/sign_up/choose_a_plan`

`PUT api/sign_up/choose_a_plan`

`PATCH api/sign_up/choose_a_plan`

`DELETE api/sign_up/choose_a_plan`

`OPTIONS api/sign_up/choose_a_plan`


<!-- END_d380132dd2bca9419c96afa059f03adf -->

<!-- START_69077bb408e946da1a3010384491db23 -->
## api/sign_up/set_account_details
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/sign_up/set_account_details" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/sign_up/set_account_details"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (422):

```json
{
    "error": "Validation",
    "validation_fields": {
        "user_sign_up": [
            "The user sign up field is required."
        ],
        "user_sign_up.choosen_plan_key": [
            "The user sign up.choosen plan key field is required."
        ]
    }
}
```

### HTTP Request
`GET api/sign_up/set_account_details`

`POST api/sign_up/set_account_details`

`PUT api/sign_up/set_account_details`

`PATCH api/sign_up/set_account_details`

`DELETE api/sign_up/set_account_details`

`OPTIONS api/sign_up/set_account_details`


<!-- END_69077bb408e946da1a3010384491db23 -->

<!-- START_4ee19608f5dfcea1f68b1d3d3ea19835 -->
## api/sign_up/choose_addons
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/sign_up/choose_addons" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/sign_up/choose_addons"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/sign_up/choose_addons`

`POST api/sign_up/choose_addons`

`PUT api/sign_up/choose_addons`

`PATCH api/sign_up/choose_addons`

`DELETE api/sign_up/choose_addons`

`OPTIONS api/sign_up/choose_addons`


<!-- END_4ee19608f5dfcea1f68b1d3d3ea19835 -->

<!-- START_b55855e6a1f68a7c96e9b4decd9791ee -->
## api/sign_up/start_trial
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/sign_up/start_trial" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/sign_up/start_trial"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/sign_up/start_trial`

`POST api/sign_up/start_trial`

`PUT api/sign_up/start_trial`

`PATCH api/sign_up/start_trial`

`DELETE api/sign_up/start_trial`

`OPTIONS api/sign_up/start_trial`


<!-- END_b55855e6a1f68a7c96e9b4decd9791ee -->

<!-- START_aa06dd2b62fa9e06353467420f691696 -->
## api/sign_up/after_interview
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/sign_up/after_interview" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/sign_up/after_interview"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (422):

```json
{
    "error": "Validation",
    "validation_fields": {
        "user_sign_up": [
            "The user sign up field is required."
        ],
        "user_sign_up.user_email": [
            "The user sign up.user email field is required."
        ],
        "user_sign_up.user_first_name": [
            "The user sign up.user first name field is required."
        ],
        "user_sign_up.user_last_name": [
            "The user sign up.user last name field is required."
        ],
        "user_sign_up.user_locality_key": [
            "The user sign up.user locality key field is required."
        ]
    }
}
```

### HTTP Request
`GET api/sign_up/after_interview`

`POST api/sign_up/after_interview`

`PUT api/sign_up/after_interview`

`PATCH api/sign_up/after_interview`

`DELETE api/sign_up/after_interview`

`OPTIONS api/sign_up/after_interview`


<!-- END_aa06dd2b62fa9e06353467420f691696 -->

<!-- START_504a4ad06a1891074c1791c47defbf46 -->
## api/setup/create_contact_lists
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/setup/create_contact_lists" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/setup/create_contact_lists"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/setup/create_contact_lists`

`POST api/setup/create_contact_lists`

`PUT api/setup/create_contact_lists`

`PATCH api/setup/create_contact_lists`

`DELETE api/setup/create_contact_lists`

`OPTIONS api/setup/create_contact_lists`


<!-- END_504a4ad06a1891074c1791c47defbf46 -->

<!-- START_54cee0c98ebd56f2a21a652a23091204 -->
## api/setup/create_projects
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/setup/create_projects" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/setup/create_projects"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/setup/create_projects`

`POST api/setup/create_projects`

`PUT api/setup/create_projects`

`PATCH api/setup/create_projects`

`DELETE api/setup/create_projects`

`OPTIONS api/setup/create_projects`


<!-- END_54cee0c98ebd56f2a21a652a23091204 -->

<!-- START_cb288b1f422bfa635d706692abd44a4e -->
## api/setup/add_contacts
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/setup/add_contacts" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/setup/add_contacts"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/setup/add_contacts`

`POST api/setup/add_contacts`

`PUT api/setup/add_contacts`

`PATCH api/setup/add_contacts`

`DELETE api/setup/add_contacts`

`OPTIONS api/setup/add_contacts`


<!-- END_cb288b1f422bfa635d706692abd44a4e -->

<!-- START_87a5d672bba6531fb2a143c877aca4be -->
## api/users/autocomplete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/users/autocomplete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/users/autocomplete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/users/autocomplete`

`POST api/users/autocomplete`

`PUT api/users/autocomplete`

`PATCH api/users/autocomplete`

`DELETE api/users/autocomplete`

`OPTIONS api/users/autocomplete`


<!-- END_87a5d672bba6531fb2a143c877aca4be -->

<!-- START_06aa56eae15ebe482fdcd508a4e9e4ad -->
## api/users/invite
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/users/invite" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/users/invite"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/users/invite`

`POST api/users/invite`

`PUT api/users/invite`

`PATCH api/users/invite`

`DELETE api/users/invite`

`OPTIONS api/users/invite`


<!-- END_06aa56eae15ebe482fdcd508a4e9e4ad -->

<!-- START_b954cb69eac09dbbb42a1f5a8553d183 -->
## api/users/{user_id}
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/users/1" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/users/1"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (404):

```json
{
    "error": "Not Found"
}
```

### HTTP Request
`GET api/users/{user_id}`


<!-- END_b954cb69eac09dbbb42a1f5a8553d183 -->

<!-- START_1ff7fc6777d8dfd1682876ec1b9b274e -->
## api/users/{user_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/users/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/users/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/users/{user_id}/update`

`POST api/users/{user_id}/update`

`PUT api/users/{user_id}/update`

`PATCH api/users/{user_id}/update`

`DELETE api/users/{user_id}/update`

`OPTIONS api/users/{user_id}/update`


<!-- END_1ff7fc6777d8dfd1682876ec1b9b274e -->

<!-- START_2601cd4767c9c1508cefc60321c9e7cb -->
## api/users/{user_id}/change_password
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/users/1/change_password" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/users/1/change_password"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/users/{user_id}/change_password`

`POST api/users/{user_id}/change_password`

`PUT api/users/{user_id}/change_password`

`PATCH api/users/{user_id}/change_password`

`DELETE api/users/{user_id}/change_password`

`OPTIONS api/users/{user_id}/change_password`


<!-- END_2601cd4767c9c1508cefc60321c9e7cb -->

<!-- START_d950c3098f3aca6fc88afc1e24d32fb1 -->
## api/users/{user_id}/image/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/users/1/image/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/users/1/image/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/users/{user_id}/image/update`

`POST api/users/{user_id}/image/update`

`PUT api/users/{user_id}/image/update`

`PATCH api/users/{user_id}/image/update`

`DELETE api/users/{user_id}/image/update`

`OPTIONS api/users/{user_id}/image/update`


<!-- END_d950c3098f3aca6fc88afc1e24d32fb1 -->

<!-- START_e42795d7aa14b60c79de643df14b320f -->
## api/users/{user_id}/projects
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/users/1/projects" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/users/1/projects"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/users/{user_id}/projects`


<!-- END_e42795d7aa14b60c79de643df14b320f -->

<!-- START_75ce0b466be498a51625b94e8a39d307 -->
## api/users/{user_id}/chats
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/users/1/chats" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/users/1/chats"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/users/{user_id}/chats`


<!-- END_75ce0b466be498a51625b94e8a39d307 -->

<!-- START_acf44c5067e9090107ac1a02f48808f8 -->
## api/users/{user_id}/message
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/users/1/message" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/users/1/message"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/users/{user_id}/message`

`POST api/users/{user_id}/message`

`PUT api/users/{user_id}/message`

`PATCH api/users/{user_id}/message`

`DELETE api/users/{user_id}/message`

`OPTIONS api/users/{user_id}/message`


<!-- END_acf44c5067e9090107ac1a02f48808f8 -->

<!-- START_03d1d42390003d38951a564382339672 -->
## api/users/{user_id}/tracking_segments
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/users/1/tracking_segments" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/users/1/tracking_segments"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/users/{user_id}/tracking_segments`

`POST api/users/{user_id}/tracking_segments`

`PUT api/users/{user_id}/tracking_segments`

`PATCH api/users/{user_id}/tracking_segments`

`DELETE api/users/{user_id}/tracking_segments`

`OPTIONS api/users/{user_id}/tracking_segments`


<!-- END_03d1d42390003d38951a564382339672 -->

<!-- START_fee7061c03c71a21f0011048430f5f3b -->
## api/users/{user_id}/open_contract
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/users/1/open_contract" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/users/1/open_contract"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/users/{user_id}/open_contract`

`POST api/users/{user_id}/open_contract`

`PUT api/users/{user_id}/open_contract`

`PATCH api/users/{user_id}/open_contract`

`DELETE api/users/{user_id}/open_contract`

`OPTIONS api/users/{user_id}/open_contract`


<!-- END_fee7061c03c71a21f0011048430f5f3b -->

<!-- START_bfc28ecdeb6a4a99976cf86359689b24 -->
## api/user_specialized_profile/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/user_specialized_profile/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/user_specialized_profile/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/user_specialized_profile/create`

`POST api/user_specialized_profile/create`

`PUT api/user_specialized_profile/create`

`PATCH api/user_specialized_profile/create`

`DELETE api/user_specialized_profile/create`

`OPTIONS api/user_specialized_profile/create`


<!-- END_bfc28ecdeb6a4a99976cf86359689b24 -->

<!-- START_ed0465107d52411e25aca8d968293af1 -->
## api/user_specialized_profile/{specialized_profile_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/user_specialized_profile/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/user_specialized_profile/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/user_specialized_profile/{specialized_profile_id}/update`

`POST api/user_specialized_profile/{specialized_profile_id}/update`

`PUT api/user_specialized_profile/{specialized_profile_id}/update`

`PATCH api/user_specialized_profile/{specialized_profile_id}/update`

`DELETE api/user_specialized_profile/{specialized_profile_id}/update`

`OPTIONS api/user_specialized_profile/{specialized_profile_id}/update`


<!-- END_ed0465107d52411e25aca8d968293af1 -->

<!-- START_3227ec17b82700517df9b49ceb2ca206 -->
## api/user_specialized_profile/{specialized_profile_id}/delete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/user_specialized_profile/1/delete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/user_specialized_profile/1/delete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/user_specialized_profile/{specialized_profile_id}/delete`

`POST api/user_specialized_profile/{specialized_profile_id}/delete`

`PUT api/user_specialized_profile/{specialized_profile_id}/delete`

`PATCH api/user_specialized_profile/{specialized_profile_id}/delete`

`DELETE api/user_specialized_profile/{specialized_profile_id}/delete`

`OPTIONS api/user_specialized_profile/{specialized_profile_id}/delete`


<!-- END_3227ec17b82700517df9b49ceb2ca206 -->

<!-- START_4fbdba1451f9a8b28bc11a52efb10ff9 -->
## api/tips/skip_all
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/tips/skip_all" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/tips/skip_all"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/tips/skip_all`

`POST api/tips/skip_all`

`PUT api/tips/skip_all`

`PATCH api/tips/skip_all`

`DELETE api/tips/skip_all`

`OPTIONS api/tips/skip_all`


<!-- END_4fbdba1451f9a8b28bc11a52efb10ff9 -->

<!-- START_31a601407d0661f82ef96ca3025277bb -->
## api/tips/{tip_id}/got_it
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/tips/1/got_it" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/tips/1/got_it"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/tips/{tip_id}/got_it`

`POST api/tips/{tip_id}/got_it`

`PUT api/tips/{tip_id}/got_it`

`PATCH api/tips/{tip_id}/got_it`

`DELETE api/tips/{tip_id}/got_it`

`OPTIONS api/tips/{tip_id}/got_it`


<!-- END_31a601407d0661f82ef96ca3025277bb -->

<!-- START_543b0b80e8dc51d2d3ad7e2a327eed26 -->
## api/contacts
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/contacts" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/contacts"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/contacts`


<!-- END_543b0b80e8dc51d2d3ad7e2a327eed26 -->

<!-- START_784765baa15f2b1c9270be4e52da49d4 -->
## api/contacts/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/contacts/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/contacts/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/contacts/create`

`POST api/contacts/create`

`PUT api/contacts/create`

`PATCH api/contacts/create`

`DELETE api/contacts/create`

`OPTIONS api/contacts/create`


<!-- END_784765baa15f2b1c9270be4e52da49d4 -->

<!-- START_ce936e1193f429ad7cfa1339f0287839 -->
## api/contacts/{contact_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/contacts/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/contacts/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/contacts/{contact_id}/update`

`POST api/contacts/{contact_id}/update`

`PUT api/contacts/{contact_id}/update`

`PATCH api/contacts/{contact_id}/update`

`DELETE api/contacts/{contact_id}/update`

`OPTIONS api/contacts/{contact_id}/update`


<!-- END_ce936e1193f429ad7cfa1339f0287839 -->

<!-- START_f441d8465f59d70d173bf1301e46bc45 -->
## api/contacts/{contact_id}/delete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/contacts/1/delete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/contacts/1/delete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/contacts/{contact_id}/delete`


<!-- END_f441d8465f59d70d173bf1301e46bc45 -->

<!-- START_8a1c1577a35f4a548740a755a929f40a -->
## api/contact_lists
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/contact_lists" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/contact_lists"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/contact_lists`


<!-- END_8a1c1577a35f4a548740a755a929f40a -->

<!-- START_ea12192a5db3a37af740c17dd070a6ee -->
## api/contact_lists/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/contact_lists/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/contact_lists/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/contact_lists/create`

`POST api/contact_lists/create`

`PUT api/contact_lists/create`

`PATCH api/contact_lists/create`

`DELETE api/contact_lists/create`

`OPTIONS api/contact_lists/create`


<!-- END_ea12192a5db3a37af740c17dd070a6ee -->

<!-- START_4220da86bda1a798b4118a080acac323 -->
## api/contact_lists/{contact_list_id}
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/contact_lists/1" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/contact_lists/1"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/contact_lists/{contact_list_id}`


<!-- END_4220da86bda1a798b4118a080acac323 -->

<!-- START_2f47c5c0f524a13a5c4bae71cdd1dc53 -->
## api/contact_lists/{contact_list_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/contact_lists/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/contact_lists/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/contact_lists/{contact_list_id}/update`

`POST api/contact_lists/{contact_list_id}/update`

`PUT api/contact_lists/{contact_list_id}/update`

`PATCH api/contact_lists/{contact_list_id}/update`

`DELETE api/contact_lists/{contact_list_id}/update`

`OPTIONS api/contact_lists/{contact_list_id}/update`


<!-- END_2f47c5c0f524a13a5c4bae71cdd1dc53 -->

<!-- START_376998bdf00374989232ef321565ba18 -->
## api/contact_lists/{contact_list_id}/delete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/contact_lists/1/delete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/contact_lists/1/delete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/contact_lists/{contact_list_id}/delete`


<!-- END_376998bdf00374989232ef321565ba18 -->

<!-- START_43f06097158e36a590d6062c457a3ee8 -->
## api/contracts/{contract_id}/close
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/contracts/1/close" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/contracts/1/close"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/contracts/{contract_id}/close`


<!-- END_43f06097158e36a590d6062c457a3ee8 -->

<!-- START_d1c066b4a987c1fd59279dffd981be87 -->
## api/contracts/{contract_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/contracts/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/contracts/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/contracts/{contract_id}/update`

`POST api/contracts/{contract_id}/update`

`PUT api/contracts/{contract_id}/update`

`PATCH api/contracts/{contract_id}/update`

`DELETE api/contracts/{contract_id}/update`

`OPTIONS api/contracts/{contract_id}/update`


<!-- END_d1c066b4a987c1fd59279dffd981be87 -->

<!-- START_479cb6ea6681f5c456280bfca2a93cb9 -->
## api/contracts/{contract_id}/milestones/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/contracts/1/milestones/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/contracts/1/milestones/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/contracts/{contract_id}/milestones/create`

`POST api/contracts/{contract_id}/milestones/create`

`PUT api/contracts/{contract_id}/milestones/create`

`PATCH api/contracts/{contract_id}/milestones/create`

`DELETE api/contracts/{contract_id}/milestones/create`

`OPTIONS api/contracts/{contract_id}/milestones/create`


<!-- END_479cb6ea6681f5c456280bfca2a93cb9 -->

<!-- START_a229bccc4a340a57e3cedbdded5be95e -->
## api/milestones/{milestone_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/milestones/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/milestones/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/milestones/{milestone_id}/update`

`POST api/milestones/{milestone_id}/update`

`PUT api/milestones/{milestone_id}/update`

`PATCH api/milestones/{milestone_id}/update`

`DELETE api/milestones/{milestone_id}/update`

`OPTIONS api/milestones/{milestone_id}/update`


<!-- END_a229bccc4a340a57e3cedbdded5be95e -->

<!-- START_5ccc7a1aeddfa78c7d01a6b6118a7715 -->
## api/milestones/{milestone_id}/activate
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/milestones/1/activate" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/milestones/1/activate"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/milestones/{milestone_id}/activate`

`POST api/milestones/{milestone_id}/activate`

`PUT api/milestones/{milestone_id}/activate`

`PATCH api/milestones/{milestone_id}/activate`

`DELETE api/milestones/{milestone_id}/activate`

`OPTIONS api/milestones/{milestone_id}/activate`


<!-- END_5ccc7a1aeddfa78c7d01a6b6118a7715 -->

<!-- START_c2878e03174d90efeb90741a5a0768f2 -->
## api/milestones/{milestone_id}/release
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/milestones/1/release" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/milestones/1/release"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/milestones/{milestone_id}/release`

`POST api/milestones/{milestone_id}/release`

`PUT api/milestones/{milestone_id}/release`

`PATCH api/milestones/{milestone_id}/release`

`DELETE api/milestones/{milestone_id}/release`

`OPTIONS api/milestones/{milestone_id}/release`


<!-- END_c2878e03174d90efeb90741a5a0768f2 -->

<!-- START_4d6399bfb3d04d1fb61bcf56538c770d -->
## api/companies/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/companies/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/companies/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/companies/create`

`POST api/companies/create`

`PUT api/companies/create`

`PATCH api/companies/create`

`DELETE api/companies/create`

`OPTIONS api/companies/create`


<!-- END_4d6399bfb3d04d1fb61bcf56538c770d -->

<!-- START_659bb87bdf394994b4e4f0ef4f648d22 -->
## api/companies/{company_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/companies/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/companies/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/companies/{company_id}/update`

`POST api/companies/{company_id}/update`

`PUT api/companies/{company_id}/update`

`PATCH api/companies/{company_id}/update`

`DELETE api/companies/{company_id}/update`

`OPTIONS api/companies/{company_id}/update`


<!-- END_659bb87bdf394994b4e4f0ef4f648d22 -->

<!-- START_28a72df80067d6c4379a255113d229bf -->
## api/companies/{company_id}/delete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/companies/1/delete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/companies/1/delete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/companies/{company_id}/delete`


<!-- END_28a72df80067d6c4379a255113d229bf -->

<!-- START_6828d473af0c8a1c5b3026bf349453ec -->
## api/company_images/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/company_images/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/company_images/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/company_images/create`

`POST api/company_images/create`

`PUT api/company_images/create`

`PATCH api/company_images/create`

`DELETE api/company_images/create`

`OPTIONS api/company_images/create`


<!-- END_6828d473af0c8a1c5b3026bf349453ec -->

<!-- START_0f42b5846fc5ff43dea538c72a5d0c3e -->
## api/company_images/{image_key}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/company_images/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/company_images/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/company_images/{image_key}/update`

`POST api/company_images/{image_key}/update`

`PUT api/company_images/{image_key}/update`

`PATCH api/company_images/{image_key}/update`

`DELETE api/company_images/{image_key}/update`

`OPTIONS api/company_images/{image_key}/update`


<!-- END_0f42b5846fc5ff43dea538c72a5d0c3e -->

<!-- START_a6f40de0e989eb93f77de6db85bc1624 -->
## api/projects/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/create`

`POST api/projects/create`

`PUT api/projects/create`

`PATCH api/projects/create`

`DELETE api/projects/create`

`OPTIONS api/projects/create`


<!-- END_a6f40de0e989eb93f77de6db85bc1624 -->

<!-- START_7a69a596773091f40d9d3eea098f0044 -->
## api/projects/{project_id}
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/1" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/1"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/{project_id}`

`POST api/projects/{project_id}`

`PUT api/projects/{project_id}`

`PATCH api/projects/{project_id}`

`DELETE api/projects/{project_id}`

`OPTIONS api/projects/{project_id}`


<!-- END_7a69a596773091f40d9d3eea098f0044 -->

<!-- START_5a58a7d4d781b09f5c0a587c0b28ba71 -->
## api/projects/{project_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/{project_id}/update`

`POST api/projects/{project_id}/update`

`PUT api/projects/{project_id}/update`

`PATCH api/projects/{project_id}/update`

`DELETE api/projects/{project_id}/update`

`OPTIONS api/projects/{project_id}/update`


<!-- END_5a58a7d4d781b09f5c0a587c0b28ba71 -->

<!-- START_11a0e8534bc0b3442bed8d2f7f42093e -->
## api/projects/{project_id}/delete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/1/delete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/1/delete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/{project_id}/delete`


<!-- END_11a0e8534bc0b3442bed8d2f7f42093e -->

<!-- START_353ced0b1cd5a14d9ecb27262960725f -->
## api/projects/{project_id}/members
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/1/members" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/1/members"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/{project_id}/members`


<!-- END_353ced0b1cd5a14d9ecb27262960725f -->

<!-- START_7356f8a47efe9f2a1def81520b63bcbe -->
## api/projects/{project_id}/invite_member
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/1/invite_member" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/1/invite_member"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/{project_id}/invite_member`

`POST api/projects/{project_id}/invite_member`

`PUT api/projects/{project_id}/invite_member`

`PATCH api/projects/{project_id}/invite_member`

`DELETE api/projects/{project_id}/invite_member`

`OPTIONS api/projects/{project_id}/invite_member`


<!-- END_7356f8a47efe9f2a1def81520b63bcbe -->

<!-- START_0130fd5bc03d0051cfa02b68de97c5fe -->
## api/projects/{project_id}/leave
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/1/leave" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/1/leave"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/{project_id}/leave`

`POST api/projects/{project_id}/leave`

`PUT api/projects/{project_id}/leave`

`PATCH api/projects/{project_id}/leave`

`DELETE api/projects/{project_id}/leave`

`OPTIONS api/projects/{project_id}/leave`


<!-- END_0130fd5bc03d0051cfa02b68de97c5fe -->

<!-- START_9456af726675dc6557cbda2effa5f2ce -->
## api/projects/{project_id}/close
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/1/close" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/1/close"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/{project_id}/close`

`POST api/projects/{project_id}/close`

`PUT api/projects/{project_id}/close`

`PATCH api/projects/{project_id}/close`

`DELETE api/projects/{project_id}/close`

`OPTIONS api/projects/{project_id}/close`


<!-- END_9456af726675dc6557cbda2effa5f2ce -->

<!-- START_c741f98ab7ee3668fc7467a8767abbc0 -->
## api/projects/{project_id}/boards/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/1/boards/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/1/boards/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/{project_id}/boards/create`

`POST api/projects/{project_id}/boards/create`

`PUT api/projects/{project_id}/boards/create`

`PATCH api/projects/{project_id}/boards/create`

`DELETE api/projects/{project_id}/boards/create`

`OPTIONS api/projects/{project_id}/boards/create`


<!-- END_c741f98ab7ee3668fc7467a8767abbc0 -->

<!-- START_d1b822d63a955c38a7d63f25bcb16c75 -->
## api/projects/interviews/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/interviews/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/interviews/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/interviews/create`

`POST api/projects/interviews/create`

`PUT api/projects/interviews/create`

`PATCH api/projects/interviews/create`

`DELETE api/projects/interviews/create`

`OPTIONS api/projects/interviews/create`


<!-- END_d1b822d63a955c38a7d63f25bcb16c75 -->

<!-- START_3410812d8b30ad2cd929ca610f6b093b -->
## api/projects/interviews/{interview_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/interviews/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/interviews/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/interviews/{interview_id}/update`

`POST api/projects/interviews/{interview_id}/update`

`PUT api/projects/interviews/{interview_id}/update`

`PATCH api/projects/interviews/{interview_id}/update`

`DELETE api/projects/interviews/{interview_id}/update`

`OPTIONS api/projects/interviews/{interview_id}/update`


<!-- END_3410812d8b30ad2cd929ca610f6b093b -->

<!-- START_8a12cce094116dfc4e8046873979f85a -->
## api/projects/interviews/{interview_id}/delete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/interviews/1/delete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/interviews/1/delete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/interviews/{interview_id}/delete`


<!-- END_8a12cce094116dfc4e8046873979f85a -->

<!-- START_030a6f8d798062527a325e052e1164a8 -->
## api/projects/interviews/{interview_id}/questions/update_positions
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/interviews/1/questions/update_positions" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/interviews/1/questions/update_positions"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/interviews/{interview_id}/questions/update_positions`

`POST api/projects/interviews/{interview_id}/questions/update_positions`

`PUT api/projects/interviews/{interview_id}/questions/update_positions`

`PATCH api/projects/interviews/{interview_id}/questions/update_positions`

`DELETE api/projects/interviews/{interview_id}/questions/update_positions`

`OPTIONS api/projects/interviews/{interview_id}/questions/update_positions`


<!-- END_030a6f8d798062527a325e052e1164a8 -->

<!-- START_31bea91fb6fee39537de6f649d2de09e -->
## api/projects/interviews/questions/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/interviews/questions/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/interviews/questions/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/interviews/questions/create`

`POST api/projects/interviews/questions/create`

`PUT api/projects/interviews/questions/create`

`PATCH api/projects/interviews/questions/create`

`DELETE api/projects/interviews/questions/create`

`OPTIONS api/projects/interviews/questions/create`


<!-- END_31bea91fb6fee39537de6f649d2de09e -->

<!-- START_d6988ce3cba16819fd216a73959f3766 -->
## api/projects/interviews/questions/{question_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/interviews/questions/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/interviews/questions/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/interviews/questions/{question_id}/update`

`POST api/projects/interviews/questions/{question_id}/update`

`PUT api/projects/interviews/questions/{question_id}/update`

`PATCH api/projects/interviews/questions/{question_id}/update`

`DELETE api/projects/interviews/questions/{question_id}/update`

`OPTIONS api/projects/interviews/questions/{question_id}/update`


<!-- END_d6988ce3cba16819fd216a73959f3766 -->

<!-- START_00b4292f79a84842be968190ac2e92f7 -->
## api/projects/interviews/questions/{question_id}/delete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/projects/interviews/questions/1/delete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/projects/interviews/questions/1/delete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/projects/interviews/questions/{question_id}/delete`


<!-- END_00b4292f79a84842be968190ac2e92f7 -->

<!-- START_c0f66608b6beaeb9699cbad7ec0cab5f -->
## api/project_members/{member_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_members/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_members/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_members/{member_id}/update`

`POST api/project_members/{member_id}/update`

`PUT api/project_members/{member_id}/update`

`PATCH api/project_members/{member_id}/update`

`DELETE api/project_members/{member_id}/update`

`OPTIONS api/project_members/{member_id}/update`


<!-- END_c0f66608b6beaeb9699cbad7ec0cab5f -->

<!-- START_a56565cbb835eb86aa85d1d42fda2d5a -->
## api/project_members/{member_id}/delete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_members/1/delete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_members/1/delete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_members/{member_id}/delete`


<!-- END_a56565cbb835eb86aa85d1d42fda2d5a -->

<!-- START_fbee6a8fcf852edc99d9794e8e44a376 -->
## api/project_boards/{project_board_id}
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_boards/1" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_boards/1"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_boards/{project_board_id}`

`POST api/project_boards/{project_board_id}`

`PUT api/project_boards/{project_board_id}`

`PATCH api/project_boards/{project_board_id}`

`DELETE api/project_boards/{project_board_id}`

`OPTIONS api/project_boards/{project_board_id}`


<!-- END_fbee6a8fcf852edc99d9794e8e44a376 -->

<!-- START_8e561651d3c214769bb3b7f5b8919f75 -->
## api/project_boards/{project_board_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_boards/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_boards/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_boards/{project_board_id}/update`

`POST api/project_boards/{project_board_id}/update`

`PUT api/project_boards/{project_board_id}/update`

`PATCH api/project_boards/{project_board_id}/update`

`DELETE api/project_boards/{project_board_id}/update`

`OPTIONS api/project_boards/{project_board_id}/update`


<!-- END_8e561651d3c214769bb3b7f5b8919f75 -->

<!-- START_3e57bce5da92fcefea49fe00473d9e74 -->
## api/project_boards/{project_board_id}/archive
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_boards/1/archive" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_boards/1/archive"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_boards/{project_board_id}/archive`

`POST api/project_boards/{project_board_id}/archive`

`PUT api/project_boards/{project_board_id}/archive`

`PATCH api/project_boards/{project_board_id}/archive`

`DELETE api/project_boards/{project_board_id}/archive`

`OPTIONS api/project_boards/{project_board_id}/archive`


<!-- END_3e57bce5da92fcefea49fe00473d9e74 -->

<!-- START_36b15eb222374ff9b8c809142c9718ae -->
## api/project_boards/{project_board_id}/member_users/{project_task_member_user_id}/add
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_boards/1/member_users/1/add" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_boards/1/member_users/1/add"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_boards/{project_board_id}/member_users/{project_task_member_user_id}/add`

`POST api/project_boards/{project_board_id}/member_users/{project_task_member_user_id}/add`

`PUT api/project_boards/{project_board_id}/member_users/{project_task_member_user_id}/add`

`PATCH api/project_boards/{project_board_id}/member_users/{project_task_member_user_id}/add`

`DELETE api/project_boards/{project_board_id}/member_users/{project_task_member_user_id}/add`

`OPTIONS api/project_boards/{project_board_id}/member_users/{project_task_member_user_id}/add`


<!-- END_36b15eb222374ff9b8c809142c9718ae -->

<!-- START_0cdddb17d72bedbd9b23b83c75c08ac5 -->
## api/project_boards/{project_board_id}/member_users/{project_task_member_user_id}/remove
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_boards/1/member_users/1/remove" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_boards/1/member_users/1/remove"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_boards/{project_board_id}/member_users/{project_task_member_user_id}/remove`

`POST api/project_boards/{project_board_id}/member_users/{project_task_member_user_id}/remove`

`PUT api/project_boards/{project_board_id}/member_users/{project_task_member_user_id}/remove`

`PATCH api/project_boards/{project_board_id}/member_users/{project_task_member_user_id}/remove`

`DELETE api/project_boards/{project_board_id}/member_users/{project_task_member_user_id}/remove`

`OPTIONS api/project_boards/{project_board_id}/member_users/{project_task_member_user_id}/remove`


<!-- END_0cdddb17d72bedbd9b23b83c75c08ac5 -->

<!-- START_0c2ab8496c176b48f65f0c0d9fab90e7 -->
## api/project_boards/{project_board_id}/lists
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_boards/1/lists" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_boards/1/lists"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_boards/{project_board_id}/lists`


<!-- END_0c2ab8496c176b48f65f0c0d9fab90e7 -->

<!-- START_6c22270c2680b8b686f07a4c958f77c2 -->
## api/project_boards/{project_board_id}/lists/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_boards/1/lists/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_boards/1/lists/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_boards/{project_board_id}/lists/create`

`POST api/project_boards/{project_board_id}/lists/create`

`PUT api/project_boards/{project_board_id}/lists/create`

`PATCH api/project_boards/{project_board_id}/lists/create`

`DELETE api/project_boards/{project_board_id}/lists/create`

`OPTIONS api/project_boards/{project_board_id}/lists/create`


<!-- END_6c22270c2680b8b686f07a4c958f77c2 -->

<!-- START_400275bd02f65a176f6e8eaa7a3d276d -->
## api/project_lists/{project_list_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_lists/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_lists/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_lists/{project_list_id}/update`

`POST api/project_lists/{project_list_id}/update`

`PUT api/project_lists/{project_list_id}/update`

`PATCH api/project_lists/{project_list_id}/update`

`DELETE api/project_lists/{project_list_id}/update`

`OPTIONS api/project_lists/{project_list_id}/update`


<!-- END_400275bd02f65a176f6e8eaa7a3d276d -->

<!-- START_7958b1d3bc113916c38363f09b9d25a6 -->
## api/project_lists/{project_list_id}/archive
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_lists/1/archive" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_lists/1/archive"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_lists/{project_list_id}/archive`

`POST api/project_lists/{project_list_id}/archive`

`PUT api/project_lists/{project_list_id}/archive`

`PATCH api/project_lists/{project_list_id}/archive`

`DELETE api/project_lists/{project_list_id}/archive`

`OPTIONS api/project_lists/{project_list_id}/archive`


<!-- END_7958b1d3bc113916c38363f09b9d25a6 -->

<!-- START_4930f1b4a3a956b0296ce47a2d951a3e -->
## api/project_lists/{project_list_id}/tasks/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_lists/1/tasks/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_lists/1/tasks/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_lists/{project_list_id}/tasks/create`

`POST api/project_lists/{project_list_id}/tasks/create`

`PUT api/project_lists/{project_list_id}/tasks/create`

`PATCH api/project_lists/{project_list_id}/tasks/create`

`DELETE api/project_lists/{project_list_id}/tasks/create`

`OPTIONS api/project_lists/{project_list_id}/tasks/create`


<!-- END_4930f1b4a3a956b0296ce47a2d951a3e -->

<!-- START_ede18bffe3d6af20b4badab194259fd9 -->
## api/project_tasks/{project_task_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_tasks/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_tasks/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_tasks/{project_task_id}/update`

`POST api/project_tasks/{project_task_id}/update`

`PUT api/project_tasks/{project_task_id}/update`

`PATCH api/project_tasks/{project_task_id}/update`

`DELETE api/project_tasks/{project_task_id}/update`

`OPTIONS api/project_tasks/{project_task_id}/update`


<!-- END_ede18bffe3d6af20b4badab194259fd9 -->

<!-- START_0665af7a0f38b0963cf88f8818fd072f -->
## api/project_tasks/{project_task_id}/archive
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_tasks/1/archive" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_tasks/1/archive"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_tasks/{project_task_id}/archive`

`POST api/project_tasks/{project_task_id}/archive`

`PUT api/project_tasks/{project_task_id}/archive`

`PATCH api/project_tasks/{project_task_id}/archive`

`DELETE api/project_tasks/{project_task_id}/archive`

`OPTIONS api/project_tasks/{project_task_id}/archive`


<!-- END_0665af7a0f38b0963cf88f8818fd072f -->

<!-- START_564d201d92069e8a57bc60e22e8a4a35 -->
## api/project_tasks/{project_task_id}/member_users/{project_task_member_user_id}/add
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_tasks/1/member_users/1/add" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_tasks/1/member_users/1/add"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_tasks/{project_task_id}/member_users/{project_task_member_user_id}/add`

`POST api/project_tasks/{project_task_id}/member_users/{project_task_member_user_id}/add`

`PUT api/project_tasks/{project_task_id}/member_users/{project_task_member_user_id}/add`

`PATCH api/project_tasks/{project_task_id}/member_users/{project_task_member_user_id}/add`

`DELETE api/project_tasks/{project_task_id}/member_users/{project_task_member_user_id}/add`

`OPTIONS api/project_tasks/{project_task_id}/member_users/{project_task_member_user_id}/add`


<!-- END_564d201d92069e8a57bc60e22e8a4a35 -->

<!-- START_83219c38a848fcaa533357346eccb3ff -->
## api/project_tasks/{project_task_id}/member_users/{project_task_member_user_id}/remove
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_tasks/1/member_users/1/remove" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_tasks/1/member_users/1/remove"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_tasks/{project_task_id}/member_users/{project_task_member_user_id}/remove`

`POST api/project_tasks/{project_task_id}/member_users/{project_task_member_user_id}/remove`

`PUT api/project_tasks/{project_task_id}/member_users/{project_task_member_user_id}/remove`

`PATCH api/project_tasks/{project_task_id}/member_users/{project_task_member_user_id}/remove`

`DELETE api/project_tasks/{project_task_id}/member_users/{project_task_member_user_id}/remove`

`OPTIONS api/project_tasks/{project_task_id}/member_users/{project_task_member_user_id}/remove`


<!-- END_83219c38a848fcaa533357346eccb3ff -->

<!-- START_6a53c99ec0c462c5ed47e3e3247be450 -->
## api/project_tasks/{project_task_id}/attachments/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/project_tasks/1/attachments/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/project_tasks/1/attachments/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/project_tasks/{project_task_id}/attachments/create`

`POST api/project_tasks/{project_task_id}/attachments/create`

`PUT api/project_tasks/{project_task_id}/attachments/create`

`PATCH api/project_tasks/{project_task_id}/attachments/create`

`DELETE api/project_tasks/{project_task_id}/attachments/create`

`OPTIONS api/project_tasks/{project_task_id}/attachments/create`


<!-- END_6a53c99ec0c462c5ed47e3e3247be450 -->

<!-- START_ec533cffa31b15fbc5efd650d8e45431 -->
## api/tracking_segments/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/tracking_segments/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/tracking_segments/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/tracking_segments/create`

`POST api/tracking_segments/create`

`PUT api/tracking_segments/create`

`PATCH api/tracking_segments/create`

`DELETE api/tracking_segments/create`

`OPTIONS api/tracking_segments/create`


<!-- END_ec533cffa31b15fbc5efd650d8e45431 -->

<!-- START_9eee473b59b43ba6f91cd23c4f4972bc -->
## api/tracking_screenshots/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/tracking_screenshots/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/tracking_screenshots/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/tracking_screenshots/create`

`POST api/tracking_screenshots/create`

`PUT api/tracking_screenshots/create`

`PATCH api/tracking_screenshots/create`

`DELETE api/tracking_screenshots/create`

`OPTIONS api/tracking_screenshots/create`


<!-- END_9eee473b59b43ba6f91cd23c4f4972bc -->

<!-- START_a35d4de9a4b65d73d595fa24ade4c6a1 -->
## api/tracking_commands/require
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/tracking_commands/require" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/tracking_commands/require"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/tracking_commands/require`

`POST api/tracking_commands/require`

`PUT api/tracking_commands/require`

`PATCH api/tracking_commands/require`

`DELETE api/tracking_commands/require`

`OPTIONS api/tracking_commands/require`


<!-- END_a35d4de9a4b65d73d595fa24ade4c6a1 -->

<!-- START_1cb4a92fd4f002ce900fc808c56edd87 -->
## api/tracking_commands/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/tracking_commands/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/tracking_commands/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/tracking_commands/create`

`POST api/tracking_commands/create`

`PUT api/tracking_commands/create`

`PATCH api/tracking_commands/create`

`DELETE api/tracking_commands/create`

`OPTIONS api/tracking_commands/create`


<!-- END_1cb4a92fd4f002ce900fc808c56edd87 -->

<!-- START_d8ad445b5e65a644ae924277ccf421f0 -->
## api/billing/cards/add
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/billing/cards/add" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/billing/cards/add"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/billing/cards/add`

`POST api/billing/cards/add`

`PUT api/billing/cards/add`

`PATCH api/billing/cards/add`

`DELETE api/billing/cards/add`

`OPTIONS api/billing/cards/add`


<!-- END_d8ad445b5e65a644ae924277ccf421f0 -->

<!-- START_d46ccc7a7bb88f78c0357c5e0fce912b -->
## api/billing/cards/{card_id}/delete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/billing/cards/1/delete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/billing/cards/1/delete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/billing/cards/{card_id}/delete`


<!-- END_d46ccc7a7bb88f78c0357c5e0fce912b -->

<!-- START_5049b7afb1f8f744154c547ade3c2c43 -->
## api/billing/cards/{card_id}/make_primary
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/billing/cards/1/make_primary" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/billing/cards/1/make_primary"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/billing/cards/{card_id}/make_primary`


<!-- END_5049b7afb1f8f744154c547ade3c2c43 -->

<!-- START_cc28d073f05ba0343d72fef09dd3aa01 -->
## api/payout_methods/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/payout_methods/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/payout_methods/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/payout_methods/create`

`POST api/payout_methods/create`

`PUT api/payout_methods/create`

`PATCH api/payout_methods/create`

`DELETE api/payout_methods/create`

`OPTIONS api/payout_methods/create`


<!-- END_cc28d073f05ba0343d72fef09dd3aa01 -->

<!-- START_5f843a98120ea911e8fee27b336ba58c -->
## api/payout_methods/{payout_method_id}/make_default
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/payout_methods/1/make_default" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/payout_methods/1/make_default"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/payout_methods/{payout_method_id}/make_default`


<!-- END_5f843a98120ea911e8fee27b336ba58c -->

<!-- START_2ec7b0e81d10196396ad8692ac4029f4 -->
## api/payout_methods/{payout_method_id}/delete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/payout_methods/1/delete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/payout_methods/1/delete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/payout_methods/{payout_method_id}/delete`


<!-- END_2ec7b0e81d10196396ad8692ac4029f4 -->

<!-- START_a3d5afa2a63a88e3da0e2f7ca20d57e7 -->
## api/payouts/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/payouts/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/payouts/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/payouts/create`

`POST api/payouts/create`

`PUT api/payouts/create`

`PATCH api/payouts/create`

`DELETE api/payouts/create`

`OPTIONS api/payouts/create`


<!-- END_a3d5afa2a63a88e3da0e2f7ca20d57e7 -->

<!-- START_d70df5a229564621ce750b758335f546 -->
## api/payouts/{payout_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/payouts/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/payouts/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/payouts/{payout_id}/update`

`POST api/payouts/{payout_id}/update`

`PUT api/payouts/{payout_id}/update`

`PATCH api/payouts/{payout_id}/update`

`DELETE api/payouts/{payout_id}/update`

`OPTIONS api/payouts/{payout_id}/update`


<!-- END_d70df5a229564621ce750b758335f546 -->

<!-- START_bbb58561d466229104b796c95cbca19b -->
## api/chats/{chat_id}
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/chats/1" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/chats/1"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/chats/{chat_id}`


<!-- END_bbb58561d466229104b796c95cbca19b -->

<!-- START_3976b55941c1739802fdf410eb047156 -->
## api/chats/{chat_id}/messages
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/chats/1/messages" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/chats/1/messages"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
{
    "error": "Internal Error",
    "class": "Symfony\\Component\\Debug\\Exception\\FatalThrowableError",
    "message": "Call to a member function canAccessChatOrForbidden() on null",
    "code": 0,
    "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/app\/Http\/Controllers\/Api\/Chat\/ChatController.php",
    "line": 29,
    "trace": [
        {
            "function": "messages",
            "class": "App\\Http\\Controllers\\Api\\Chat\\ChatController",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Controller.php",
            "line": 54,
            "function": "call_user_func_array"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/ControllerDispatcher.php",
            "line": 45,
            "function": "callAction",
            "class": "Illuminate\\Routing\\Controller",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Route.php",
            "line": 219,
            "function": "dispatch",
            "class": "Illuminate\\Routing\\ControllerDispatcher",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Route.php",
            "line": 176,
            "function": "runController",
            "class": "Illuminate\\Routing\\Route",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 680,
            "function": "run",
            "class": "Illuminate\\Routing\\Route",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 30,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/app\/Http\/Middleware\/ApiLocaleDetection.php",
            "line": 26,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "App\\Http\\Middleware\\ApiLocaleDetection",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/app\/Http\/Middleware\/GuardSwitcher.php",
            "line": 15,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "App\\Http\\Middleware\\GuardSwitcher",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Middleware\/SubstituteBindings.php",
            "line": 41,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Routing\\Middleware\\SubstituteBindings",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 104,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 682,
            "function": "then",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 657,
            "function": "runRouteWithinStack",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 623,
            "function": "runRoute",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 612,
            "function": "dispatchToRoute",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Kernel.php",
            "line": 176,
            "function": "dispatch",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 30,
            "function": "Illuminate\\Foundation\\Http\\{closure}",
            "class": "Illuminate\\Foundation\\Http\\Kernel",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/barryvdh\/laravel-debugbar\/src\/Middleware\/InjectDebugbar.php",
            "line": 58,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Barryvdh\\Debugbar\\Middleware\\InjectDebugbar",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/fruitcake\/laravel-cors\/src\/HandleCors.php",
            "line": 36,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Fruitcake\\Cors\\HandleCors",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/fideloper\/proxy\/src\/TrustProxies.php",
            "line": 57,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Fideloper\\Proxy\\TrustProxies",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/TransformsRequest.php",
            "line": 21,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/TransformsRequest.php",
            "line": 21,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/ValidatePostSize.php",
            "line": 27,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\ValidatePostSize",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/CheckForMaintenanceMode.php",
            "line": 62,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\CheckForMaintenanceMode",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 104,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Kernel.php",
            "line": 151,
            "function": "then",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Kernel.php",
            "line": 116,
            "function": "sendRequestThroughRouter",
            "class": "Illuminate\\Foundation\\Http\\Kernel",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Strategies\/Responses\/ResponseCalls.php",
            "line": 307,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Kernel",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Strategies\/Responses\/ResponseCalls.php",
            "line": 289,
            "function": "callLaravelRoute",
            "class": "Mpociot\\ApiDoc\\Extracting\\Strategies\\Responses\\ResponseCalls",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Strategies\/Responses\/ResponseCalls.php",
            "line": 47,
            "function": "makeApiCall",
            "class": "Mpociot\\ApiDoc\\Extracting\\Strategies\\Responses\\ResponseCalls",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Generator.php",
            "line": 172,
            "function": "__invoke",
            "class": "Mpociot\\ApiDoc\\Extracting\\Strategies\\Responses\\ResponseCalls",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Generator.php",
            "line": 121,
            "function": "iterateThroughStrategies",
            "class": "Mpociot\\ApiDoc\\Extracting\\Generator",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Generator.php",
            "line": 84,
            "function": "fetchResponses",
            "class": "Mpociot\\ApiDoc\\Extracting\\Generator",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Commands\/GenerateDocumentation.php",
            "line": 125,
            "function": "processRoute",
            "class": "Mpociot\\ApiDoc\\Extracting\\Generator",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Commands\/GenerateDocumentation.php",
            "line": 69,
            "function": "processRoutes",
            "class": "Mpociot\\ApiDoc\\Commands\\GenerateDocumentation",
            "type": "->"
        },
        {
            "function": "handle",
            "class": "Mpociot\\ApiDoc\\Commands\\GenerateDocumentation",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/BoundMethod.php",
            "line": 32,
            "function": "call_user_func_array"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/BoundMethod.php",
            "line": 90,
            "function": "Illuminate\\Container\\{closure}",
            "class": "Illuminate\\Container\\BoundMethod",
            "type": "::"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/BoundMethod.php",
            "line": 34,
            "function": "callBoundMethod",
            "class": "Illuminate\\Container\\BoundMethod",
            "type": "::"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/Container.php",
            "line": 576,
            "function": "call",
            "class": "Illuminate\\Container\\BoundMethod",
            "type": "::"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Console\/Command.php",
            "line": 183,
            "function": "call",
            "class": "Illuminate\\Container\\Container",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Command\/Command.php",
            "line": 255,
            "function": "execute",
            "class": "Illuminate\\Console\\Command",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Console\/Command.php",
            "line": 170,
            "function": "run",
            "class": "Symfony\\Component\\Console\\Command\\Command",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Application.php",
            "line": 908,
            "function": "run",
            "class": "Illuminate\\Console\\Command",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Application.php",
            "line": 269,
            "function": "doRunCommand",
            "class": "Symfony\\Component\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Application.php",
            "line": 145,
            "function": "doRun",
            "class": "Symfony\\Component\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Console\/Application.php",
            "line": 90,
            "function": "run",
            "class": "Symfony\\Component\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Console\/Kernel.php",
            "line": 133,
            "function": "run",
            "class": "Illuminate\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/artisan",
            "line": 37,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Console\\Kernel",
            "type": "->"
        }
    ]
}
```

### HTTP Request
`GET api/chats/{chat_id}/messages`


<!-- END_3976b55941c1739802fdf410eb047156 -->

<!-- START_b7e3020acac4fec405b28aa506b4bdc6 -->
## api/chats/{chat_id}/messages/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/chats/1/messages/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/chats/1/messages/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
{
    "error": "Internal Error",
    "class": "Symfony\\Component\\Debug\\Exception\\FatalThrowableError",
    "message": "Call to a member function canAccessChatOrForbidden() on null",
    "code": 0,
    "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/app\/Http\/Controllers\/Api\/Chat\/ChatController.php",
    "line": 41,
    "trace": [
        {
            "function": "create_message",
            "class": "App\\Http\\Controllers\\Api\\Chat\\ChatController",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Controller.php",
            "line": 54,
            "function": "call_user_func_array"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/ControllerDispatcher.php",
            "line": 45,
            "function": "callAction",
            "class": "Illuminate\\Routing\\Controller",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Route.php",
            "line": 219,
            "function": "dispatch",
            "class": "Illuminate\\Routing\\ControllerDispatcher",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Route.php",
            "line": 176,
            "function": "runController",
            "class": "Illuminate\\Routing\\Route",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 680,
            "function": "run",
            "class": "Illuminate\\Routing\\Route",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 30,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/app\/Http\/Middleware\/ApiLocaleDetection.php",
            "line": 26,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "App\\Http\\Middleware\\ApiLocaleDetection",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/app\/Http\/Middleware\/GuardSwitcher.php",
            "line": 15,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "App\\Http\\Middleware\\GuardSwitcher",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Middleware\/SubstituteBindings.php",
            "line": 41,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Routing\\Middleware\\SubstituteBindings",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 104,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 682,
            "function": "then",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 657,
            "function": "runRouteWithinStack",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 623,
            "function": "runRoute",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 612,
            "function": "dispatchToRoute",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Kernel.php",
            "line": 176,
            "function": "dispatch",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 30,
            "function": "Illuminate\\Foundation\\Http\\{closure}",
            "class": "Illuminate\\Foundation\\Http\\Kernel",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/barryvdh\/laravel-debugbar\/src\/Middleware\/InjectDebugbar.php",
            "line": 58,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Barryvdh\\Debugbar\\Middleware\\InjectDebugbar",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/fruitcake\/laravel-cors\/src\/HandleCors.php",
            "line": 36,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Fruitcake\\Cors\\HandleCors",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/fideloper\/proxy\/src\/TrustProxies.php",
            "line": 57,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Fideloper\\Proxy\\TrustProxies",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/TransformsRequest.php",
            "line": 21,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/TransformsRequest.php",
            "line": 21,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/ValidatePostSize.php",
            "line": 27,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\ValidatePostSize",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/CheckForMaintenanceMode.php",
            "line": 62,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\CheckForMaintenanceMode",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 104,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Kernel.php",
            "line": 151,
            "function": "then",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Kernel.php",
            "line": 116,
            "function": "sendRequestThroughRouter",
            "class": "Illuminate\\Foundation\\Http\\Kernel",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Strategies\/Responses\/ResponseCalls.php",
            "line": 307,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Kernel",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Strategies\/Responses\/ResponseCalls.php",
            "line": 289,
            "function": "callLaravelRoute",
            "class": "Mpociot\\ApiDoc\\Extracting\\Strategies\\Responses\\ResponseCalls",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Strategies\/Responses\/ResponseCalls.php",
            "line": 47,
            "function": "makeApiCall",
            "class": "Mpociot\\ApiDoc\\Extracting\\Strategies\\Responses\\ResponseCalls",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Generator.php",
            "line": 172,
            "function": "__invoke",
            "class": "Mpociot\\ApiDoc\\Extracting\\Strategies\\Responses\\ResponseCalls",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Generator.php",
            "line": 121,
            "function": "iterateThroughStrategies",
            "class": "Mpociot\\ApiDoc\\Extracting\\Generator",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Generator.php",
            "line": 84,
            "function": "fetchResponses",
            "class": "Mpociot\\ApiDoc\\Extracting\\Generator",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Commands\/GenerateDocumentation.php",
            "line": 125,
            "function": "processRoute",
            "class": "Mpociot\\ApiDoc\\Extracting\\Generator",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Commands\/GenerateDocumentation.php",
            "line": 69,
            "function": "processRoutes",
            "class": "Mpociot\\ApiDoc\\Commands\\GenerateDocumentation",
            "type": "->"
        },
        {
            "function": "handle",
            "class": "Mpociot\\ApiDoc\\Commands\\GenerateDocumentation",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/BoundMethod.php",
            "line": 32,
            "function": "call_user_func_array"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/BoundMethod.php",
            "line": 90,
            "function": "Illuminate\\Container\\{closure}",
            "class": "Illuminate\\Container\\BoundMethod",
            "type": "::"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/BoundMethod.php",
            "line": 34,
            "function": "callBoundMethod",
            "class": "Illuminate\\Container\\BoundMethod",
            "type": "::"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/Container.php",
            "line": 576,
            "function": "call",
            "class": "Illuminate\\Container\\BoundMethod",
            "type": "::"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Console\/Command.php",
            "line": 183,
            "function": "call",
            "class": "Illuminate\\Container\\Container",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Command\/Command.php",
            "line": 255,
            "function": "execute",
            "class": "Illuminate\\Console\\Command",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Console\/Command.php",
            "line": 170,
            "function": "run",
            "class": "Symfony\\Component\\Console\\Command\\Command",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Application.php",
            "line": 908,
            "function": "run",
            "class": "Illuminate\\Console\\Command",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Application.php",
            "line": 269,
            "function": "doRunCommand",
            "class": "Symfony\\Component\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Application.php",
            "line": 145,
            "function": "doRun",
            "class": "Symfony\\Component\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Console\/Application.php",
            "line": 90,
            "function": "run",
            "class": "Symfony\\Component\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Console\/Kernel.php",
            "line": 133,
            "function": "run",
            "class": "Illuminate\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/artisan",
            "line": 37,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Console\\Kernel",
            "type": "->"
        }
    ]
}
```

### HTTP Request
`GET api/chats/{chat_id}/messages/create`

`POST api/chats/{chat_id}/messages/create`

`PUT api/chats/{chat_id}/messages/create`

`PATCH api/chats/{chat_id}/messages/create`

`DELETE api/chats/{chat_id}/messages/create`

`OPTIONS api/chats/{chat_id}/messages/create`


<!-- END_b7e3020acac4fec405b28aa506b4bdc6 -->

<!-- START_3b15b034b82c4301006a1065f053fa26 -->
## api/chat_messages/{message_id}
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/chat_messages/1" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/chat_messages/1"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
{
    "data": "NOT AVAILABLE RIGHT NOW"
}
```

### HTTP Request
`GET api/chat_messages/{message_id}`


<!-- END_3b15b034b82c4301006a1065f053fa26 -->

<!-- START_53096ede58bb75e6b6f8e37e1161dc18 -->
## api/chat_message_attachments/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/chat_message_attachments/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/chat_message_attachments/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (401):

```json
{
    "error": "Unauthenticated"
}
```

### HTTP Request
`GET api/chat_message_attachments/create`

`POST api/chat_message_attachments/create`

`PUT api/chat_message_attachments/create`

`PATCH api/chat_message_attachments/create`

`DELETE api/chat_message_attachments/create`

`OPTIONS api/chat_message_attachments/create`


<!-- END_53096ede58bb75e6b6f8e37e1161dc18 -->

<!-- START_01abf62a83e36ad530a784a6671c4c8a -->
## api/countries/autocomplete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/countries/autocomplete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/countries/autocomplete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
{
    "data": [
        {
            "id": 220,
            "alpha2_code": "US",
            "phone_code": 1,
            "phone_number_mask": "(XXX) XXX-XXXX",
            "name": "United States of America"
        },
        {
            "id": 38,
            "alpha2_code": "CA",
            "phone_code": 1,
            "phone_number_mask": "(XXX) XXX-XXXX",
            "name": "Canada"
        },
        {
            "id": 73,
            "alpha2_code": "FR",
            "phone_code": 33,
            "phone_number_mask": "0X XX XX XX XX",
            "name": "France"
        },
        {
            "id": 79,
            "alpha2_code": "DE",
            "phone_code": 49,
            "phone_number_mask": "0XXXX XXXXXXX",
            "name": "Germany"
        },
        {
            "id": 14,
            "alpha2_code": "AT",
            "phone_code": 43,
            "phone_number_mask": "0XXX XXXXXX",
            "name": "Austria"
        },
        {
            "id": 13,
            "alpha2_code": "AU",
            "phone_code": 61,
            "phone_number_mask": "0XXX XXX XXX",
            "name": "Australia"
        },
        {
            "id": 29,
            "alpha2_code": "BR",
            "phone_code": 55,
            "phone_number_mask": "(XX) XXXXX-XXXX",
            "name": "Brazil"
        },
        {
            "id": 100,
            "alpha2_code": "IE",
            "phone_code": 353,
            "phone_number_mask": "0XX XXX XXXX",
            "name": "Ireland"
        },
        {
            "id": 58,
            "alpha2_code": "DK",
            "phone_code": 45,
            "phone_number_mask": "XX XX XX XX",
            "name": "Denmark"
        },
        {
            "id": 146,
            "alpha2_code": "NL",
            "phone_code": 31,
            "phone_number_mask": "0X XXXXXXXX",
            "name": "Netherlands"
        },
        {
            "id": 72,
            "alpha2_code": "FI",
            "phone_code": 358,
            "phone_number_mask": "0XX XXXXXXX",
            "name": "Finland"
        },
        {
            "id": 200,
            "alpha2_code": "SE",
            "phone_code": 46,
            "phone_number_mask": "0XX-XXX XX XX",
            "name": "Sweden"
        },
        {
            "id": 155,
            "alpha2_code": "NO",
            "phone_code": 47,
            "phone_number_mask": "XXX XX XXX",
            "name": "Norway"
        },
        {
            "id": 171,
            "alpha2_code": "RU",
            "phone_code": 7,
            "phone_number_mask": "8 (XXX) XXX-XX-XX",
            "name": "Russian Federation"
        },
        {
            "id": 217,
            "alpha2_code": "UA",
            "phone_code": 380,
            "phone_number_mask": "0XX XXX XXXX",
            "name": "Ukraine"
        },
        {
            "id": 97,
            "alpha2_code": "IN",
            "phone_code": 91,
            "phone_number_mask": "0XXXXX XXXXX",
            "name": "India"
        },
        {
            "id": 157,
            "alpha2_code": "PK",
            "phone_code": 92,
            "phone_number_mask": "0XXX XXXXXXX",
            "name": "Pakistan"
        },
        {
            "id": 18,
            "alpha2_code": "BD",
            "phone_code": 880,
            "phone_number_mask": "0XXXX-XXXXXX",
            "name": "Bangladesh"
        }
    ]
}
```

### HTTP Request
`GET api/countries/autocomplete`

`POST api/countries/autocomplete`

`PUT api/countries/autocomplete`

`PATCH api/countries/autocomplete`

`DELETE api/countries/autocomplete`

`OPTIONS api/countries/autocomplete`


<!-- END_01abf62a83e36ad530a784a6671c4c8a -->

<!-- START_e4503ae12637088391f230e90bd8f04f -->
## api/localities/autocomplete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/localities/autocomplete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/localities/autocomplete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
{
    "data": []
}
```

### HTTP Request
`GET api/localities/autocomplete`

`POST api/localities/autocomplete`

`PUT api/localities/autocomplete`

`PATCH api/localities/autocomplete`

`DELETE api/localities/autocomplete`

`OPTIONS api/localities/autocomplete`


<!-- END_e4503ae12637088391f230e90bd8f04f -->

<!-- START_bd86fbe97b4cf233313d90107e12ec38 -->
## api/waiters/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/waiters/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/waiters/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (400):

```json
{
    "error": "Validation",
    "validation_fields": {
        "waiter": [
            "The waiter field is required."
        ],
        "waiter.email": [
            "The waiter.email field is required."
        ]
    }
}
```

### HTTP Request
`GET api/waiters/create`

`POST api/waiters/create`

`PUT api/waiters/create`

`PATCH api/waiters/create`

`DELETE api/waiters/create`

`OPTIONS api/waiters/create`


<!-- END_bd86fbe97b4cf233313d90107e12ec38 -->

<!-- START_16e4f7f2b28ea10a3498a2e4483073c1 -->
## api/interview_result/link_with_user
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/interview_result/link_with_user" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/interview_result/link_with_user"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (422):

```json
{
    "error": "Validation",
    "validation_fields": {
        "user_id": [
            "The user id field is required."
        ]
    }
}
```

### HTTP Request
`GET api/interview_result/link_with_user`

`POST api/interview_result/link_with_user`

`PUT api/interview_result/link_with_user`

`PATCH api/interview_result/link_with_user`

`DELETE api/interview_result/link_with_user`

`OPTIONS api/interview_result/link_with_user`


<!-- END_16e4f7f2b28ea10a3498a2e4483073c1 -->

<!-- START_295af3d860386f4d4b23f0be4bc5a38b -->
## api/interview_result/{interview_hash}/answers
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/interview_result/1/answers" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/interview_result/1/answers"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (422):

```json
{
    "error": "Validation",
    "validation_fields": {
        "interview": [
            "The interview field is required."
        ],
        "interview.result_key": [
            "The interview.result key field is required."
        ],
        "interview.answers": [
            "The interview.answers field is required."
        ]
    }
}
```

### HTTP Request
`GET api/interview_result/{interview_hash}/answers`

`POST api/interview_result/{interview_hash}/answers`

`PUT api/interview_result/{interview_hash}/answers`

`PATCH api/interview_result/{interview_hash}/answers`

`DELETE api/interview_result/{interview_hash}/answers`

`OPTIONS api/interview_result/{interview_hash}/answers`


<!-- END_295af3d860386f4d4b23f0be4bc5a38b -->

<!-- START_16af7a29fea673247051bcfda9a6c331 -->
## api/help_center_articles
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/help_center_articles" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/help_center_articles"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
{
    "data": []
}
```

### HTTP Request
`GET api/help_center_articles`


<!-- END_16af7a29fea673247051bcfda9a6c331 -->

<!-- START_be2625964bbd3df3c2ef3db3263ea143 -->
## api/help_center_articles/vote_yes
> Example request:

```bash
curl -X POST \
    "http://loc.screentrack.com/api/help_center_articles/vote_yes" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/help_center_articles/vote_yes"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



### HTTP Request
`POST api/help_center_articles/vote_yes`


<!-- END_be2625964bbd3df3c2ef3db3263ea143 -->

<!-- START_166bbff4f36176b6cfc5ea96e9d8677e -->
## api/help_center_articles/vote_no
> Example request:

```bash
curl -X POST \
    "http://loc.screentrack.com/api/help_center_articles/vote_no" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/help_center_articles/vote_no"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



### HTTP Request
`POST api/help_center_articles/vote_no`


<!-- END_166bbff4f36176b6cfc5ea96e9d8677e -->

<!-- START_6dcb7c411782a76b4e8a2517d677b32f -->
## api/help_center_articles/viewed
> Example request:

```bash
curl -X POST \
    "http://loc.screentrack.com/api/help_center_articles/viewed" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/help_center_articles/viewed"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



### HTTP Request
`POST api/help_center_articles/viewed`


<!-- END_6dcb7c411782a76b4e8a2517d677b32f -->

<!-- START_af6ed4773d689a1fa38c3a8bd56c26eb -->
## api/help_center_articles/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/help_center_articles/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/help_center_articles/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (422):

```json
{
    "error": "Validation",
    "validation_fields": {
        "article.title": [
            "The article.title field is required."
        ],
        "article.intended_for": [
            "The article.intended for field is required."
        ],
        "article.content": [
            "The article.content field is required."
        ]
    }
}
```

### HTTP Request
`GET api/help_center_articles/create`

`POST api/help_center_articles/create`

`PUT api/help_center_articles/create`

`PATCH api/help_center_articles/create`

`DELETE api/help_center_articles/create`

`OPTIONS api/help_center_articles/create`


<!-- END_af6ed4773d689a1fa38c3a8bd56c26eb -->

<!-- START_57b74ec191d96542fb38235281b28727 -->
## api/help_center_articles/{article_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/help_center_articles/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/help_center_articles/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (422):

```json
{
    "error": "Validation",
    "validation_fields": {
        "article.title": [
            "The article.title field is required."
        ],
        "article.intended_for": [
            "The article.intended for field is required."
        ],
        "article.content": [
            "The article.content field is required."
        ]
    }
}
```

### HTTP Request
`GET api/help_center_articles/{article_id}/update`

`POST api/help_center_articles/{article_id}/update`

`PUT api/help_center_articles/{article_id}/update`

`PATCH api/help_center_articles/{article_id}/update`

`DELETE api/help_center_articles/{article_id}/update`

`OPTIONS api/help_center_articles/{article_id}/update`


<!-- END_57b74ec191d96542fb38235281b28727 -->

<!-- START_febacbbcd63fcbaed4ca08ca33766fd9 -->
## api/help_center_articles/{article_id}/delete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/help_center_articles/1/delete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/help_center_articles/1/delete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (404):

```json
{
    "error": "Not Found"
}
```

### HTTP Request
`GET api/help_center_articles/{article_id}/delete`


<!-- END_febacbbcd63fcbaed4ca08ca33766fd9 -->

<!-- START_0facbe5bfebbf2673a5626ffbe5b2215 -->
## api/contact_us/send_message
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/contact_us/send_message" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/contact_us/send_message"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (422):

```json
{
    "error": "Validation",
    "validation_fields": {
        "contact_us": [
            "The contact us field is required."
        ],
        "contact_us.type": [
            "The contact us.type field is required."
        ],
        "contact_us.email": [
            "The contact us.email field is required."
        ],
        "contact_us.name": [
            "The contact us.name field is required."
        ],
        "contact_us.message_title": [
            "The contact us.message title field is required."
        ],
        "contact_us.message_text": [
            "The contact us.message text field is required."
        ]
    }
}
```

### HTTP Request
`GET api/contact_us/send_message`

`POST api/contact_us/send_message`

`PUT api/contact_us/send_message`

`PATCH api/contact_us/send_message`

`DELETE api/contact_us/send_message`

`OPTIONS api/contact_us/send_message`


<!-- END_0facbe5bfebbf2673a5626ffbe5b2215 -->

<!-- START_2119f17c70ab4137cb78048bbc959e18 -->
## api/blog_articles
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/blog_articles" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/blog_articles"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
{
    "data": []
}
```

### HTTP Request
`GET api/blog_articles`


<!-- END_2119f17c70ab4137cb78048bbc959e18 -->

<!-- START_1ba2d7276df36841e25499646ff2c0c3 -->
## api/blog_articles/vote_yes
> Example request:

```bash
curl -X POST \
    "http://loc.screentrack.com/api/blog_articles/vote_yes" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/blog_articles/vote_yes"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



### HTTP Request
`POST api/blog_articles/vote_yes`


<!-- END_1ba2d7276df36841e25499646ff2c0c3 -->

<!-- START_4b2e0c7cc7d21d9017a830bfe0e0ca59 -->
## api/blog_articles/vote_no
> Example request:

```bash
curl -X POST \
    "http://loc.screentrack.com/api/blog_articles/vote_no" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/blog_articles/vote_no"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



### HTTP Request
`POST api/blog_articles/vote_no`


<!-- END_4b2e0c7cc7d21d9017a830bfe0e0ca59 -->

<!-- START_bac6f42dbc486a16a23166990a7c9483 -->
## api/blog_articles/viewed
> Example request:

```bash
curl -X POST \
    "http://loc.screentrack.com/api/blog_articles/viewed" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/blog_articles/viewed"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "POST",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```



### HTTP Request
`POST api/blog_articles/viewed`


<!-- END_bac6f42dbc486a16a23166990a7c9483 -->

<!-- START_73eb4e4efb4599e2e0f79facde31c1a9 -->
## api/blog_articles/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/blog_articles/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/blog_articles/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (422):

```json
{
    "error": "Validation",
    "validation_fields": {
        "article.title": [
            "The article.title field is required."
        ],
        "article.content": [
            "The article.content field is required."
        ]
    }
}
```

### HTTP Request
`GET api/blog_articles/create`

`POST api/blog_articles/create`

`PUT api/blog_articles/create`

`PATCH api/blog_articles/create`

`DELETE api/blog_articles/create`

`OPTIONS api/blog_articles/create`


<!-- END_73eb4e4efb4599e2e0f79facde31c1a9 -->

<!-- START_e4aed1b32750f0233643fc67f25db1d8 -->
## api/blog_articles/{article_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/blog_articles/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/blog_articles/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (422):

```json
{
    "error": "Validation",
    "validation_fields": {
        "article.title": [
            "The article.title field is required."
        ],
        "article.content": [
            "The article.content field is required."
        ]
    }
}
```

### HTTP Request
`GET api/blog_articles/{article_id}/update`

`POST api/blog_articles/{article_id}/update`

`PUT api/blog_articles/{article_id}/update`

`PATCH api/blog_articles/{article_id}/update`

`DELETE api/blog_articles/{article_id}/update`

`OPTIONS api/blog_articles/{article_id}/update`


<!-- END_e4aed1b32750f0233643fc67f25db1d8 -->

<!-- START_98c17d561077cb42a1e2c5a64d7b30a8 -->
## api/blog_articles/{article_id}/delete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/blog_articles/1/delete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/blog_articles/1/delete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (404):

```json
{
    "error": "Not Found"
}
```

### HTTP Request
`GET api/blog_articles/{article_id}/delete`


<!-- END_98c17d561077cb42a1e2c5a64d7b30a8 -->

<!-- START_ea20fef1265d876d945186761ffa595f -->
## api/administrators/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/administrators/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/administrators/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
{
    "error": "Internal Error",
    "class": "Symfony\\Component\\Debug\\Exception\\FatalThrowableError",
    "message": "Access to undeclared static property: App\\Models\\Administrator::$roles_list",
    "code": 0,
    "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/app\/Http\/Controllers\/Api\/Admin\/AdministratorsController.php",
    "line": 18,
    "trace": [
        {
            "function": "create",
            "class": "App\\Http\\Controllers\\Api\\Admin\\AdministratorsController",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Controller.php",
            "line": 54,
            "function": "call_user_func_array"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/ControllerDispatcher.php",
            "line": 45,
            "function": "callAction",
            "class": "Illuminate\\Routing\\Controller",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Route.php",
            "line": 219,
            "function": "dispatch",
            "class": "Illuminate\\Routing\\ControllerDispatcher",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Route.php",
            "line": 176,
            "function": "runController",
            "class": "Illuminate\\Routing\\Route",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 680,
            "function": "run",
            "class": "Illuminate\\Routing\\Route",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 30,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/app\/Http\/Middleware\/ApiLocaleDetection.php",
            "line": 26,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "App\\Http\\Middleware\\ApiLocaleDetection",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/app\/Http\/Middleware\/GuardSwitcher.php",
            "line": 15,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "App\\Http\\Middleware\\GuardSwitcher",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Middleware\/SubstituteBindings.php",
            "line": 41,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Routing\\Middleware\\SubstituteBindings",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 104,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 682,
            "function": "then",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 657,
            "function": "runRouteWithinStack",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 623,
            "function": "runRoute",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 612,
            "function": "dispatchToRoute",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Kernel.php",
            "line": 176,
            "function": "dispatch",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 30,
            "function": "Illuminate\\Foundation\\Http\\{closure}",
            "class": "Illuminate\\Foundation\\Http\\Kernel",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/barryvdh\/laravel-debugbar\/src\/Middleware\/InjectDebugbar.php",
            "line": 58,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Barryvdh\\Debugbar\\Middleware\\InjectDebugbar",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/fruitcake\/laravel-cors\/src\/HandleCors.php",
            "line": 36,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Fruitcake\\Cors\\HandleCors",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/fideloper\/proxy\/src\/TrustProxies.php",
            "line": 57,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Fideloper\\Proxy\\TrustProxies",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/TransformsRequest.php",
            "line": 21,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/TransformsRequest.php",
            "line": 21,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/ValidatePostSize.php",
            "line": 27,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\ValidatePostSize",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/CheckForMaintenanceMode.php",
            "line": 62,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\CheckForMaintenanceMode",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 104,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Kernel.php",
            "line": 151,
            "function": "then",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Kernel.php",
            "line": 116,
            "function": "sendRequestThroughRouter",
            "class": "Illuminate\\Foundation\\Http\\Kernel",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Strategies\/Responses\/ResponseCalls.php",
            "line": 307,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Kernel",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Strategies\/Responses\/ResponseCalls.php",
            "line": 289,
            "function": "callLaravelRoute",
            "class": "Mpociot\\ApiDoc\\Extracting\\Strategies\\Responses\\ResponseCalls",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Strategies\/Responses\/ResponseCalls.php",
            "line": 47,
            "function": "makeApiCall",
            "class": "Mpociot\\ApiDoc\\Extracting\\Strategies\\Responses\\ResponseCalls",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Generator.php",
            "line": 172,
            "function": "__invoke",
            "class": "Mpociot\\ApiDoc\\Extracting\\Strategies\\Responses\\ResponseCalls",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Generator.php",
            "line": 121,
            "function": "iterateThroughStrategies",
            "class": "Mpociot\\ApiDoc\\Extracting\\Generator",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Generator.php",
            "line": 84,
            "function": "fetchResponses",
            "class": "Mpociot\\ApiDoc\\Extracting\\Generator",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Commands\/GenerateDocumentation.php",
            "line": 125,
            "function": "processRoute",
            "class": "Mpociot\\ApiDoc\\Extracting\\Generator",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Commands\/GenerateDocumentation.php",
            "line": 69,
            "function": "processRoutes",
            "class": "Mpociot\\ApiDoc\\Commands\\GenerateDocumentation",
            "type": "->"
        },
        {
            "function": "handle",
            "class": "Mpociot\\ApiDoc\\Commands\\GenerateDocumentation",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/BoundMethod.php",
            "line": 32,
            "function": "call_user_func_array"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/BoundMethod.php",
            "line": 90,
            "function": "Illuminate\\Container\\{closure}",
            "class": "Illuminate\\Container\\BoundMethod",
            "type": "::"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/BoundMethod.php",
            "line": 34,
            "function": "callBoundMethod",
            "class": "Illuminate\\Container\\BoundMethod",
            "type": "::"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/Container.php",
            "line": 576,
            "function": "call",
            "class": "Illuminate\\Container\\BoundMethod",
            "type": "::"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Console\/Command.php",
            "line": 183,
            "function": "call",
            "class": "Illuminate\\Container\\Container",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Command\/Command.php",
            "line": 255,
            "function": "execute",
            "class": "Illuminate\\Console\\Command",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Console\/Command.php",
            "line": 170,
            "function": "run",
            "class": "Symfony\\Component\\Console\\Command\\Command",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Application.php",
            "line": 908,
            "function": "run",
            "class": "Illuminate\\Console\\Command",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Application.php",
            "line": 269,
            "function": "doRunCommand",
            "class": "Symfony\\Component\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Application.php",
            "line": 145,
            "function": "doRun",
            "class": "Symfony\\Component\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Console\/Application.php",
            "line": 90,
            "function": "run",
            "class": "Symfony\\Component\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Console\/Kernel.php",
            "line": 133,
            "function": "run",
            "class": "Illuminate\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/artisan",
            "line": 37,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Console\\Kernel",
            "type": "->"
        }
    ]
}
```

### HTTP Request
`GET api/administrators/create`

`POST api/administrators/create`

`PUT api/administrators/create`

`PATCH api/administrators/create`

`DELETE api/administrators/create`

`OPTIONS api/administrators/create`


<!-- END_ea20fef1265d876d945186761ffa595f -->

<!-- START_af33928fcd53fc6c0d5ce2708f8b4061 -->
## api/administrators/{administrator_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/administrators/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/administrators/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
{
    "error": "Internal Error",
    "class": "Symfony\\Component\\Debug\\Exception\\FatalThrowableError",
    "message": "Access to undeclared static property: App\\Models\\Administrator::$roles_list",
    "code": 0,
    "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/app\/Http\/Controllers\/Api\/Admin\/AdministratorsController.php",
    "line": 41,
    "trace": [
        {
            "function": "update",
            "class": "App\\Http\\Controllers\\Api\\Admin\\AdministratorsController",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Controller.php",
            "line": 54,
            "function": "call_user_func_array"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/ControllerDispatcher.php",
            "line": 45,
            "function": "callAction",
            "class": "Illuminate\\Routing\\Controller",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Route.php",
            "line": 219,
            "function": "dispatch",
            "class": "Illuminate\\Routing\\ControllerDispatcher",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Route.php",
            "line": 176,
            "function": "runController",
            "class": "Illuminate\\Routing\\Route",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 680,
            "function": "run",
            "class": "Illuminate\\Routing\\Route",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 30,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/app\/Http\/Middleware\/ApiLocaleDetection.php",
            "line": 26,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "App\\Http\\Middleware\\ApiLocaleDetection",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/app\/Http\/Middleware\/GuardSwitcher.php",
            "line": 15,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "App\\Http\\Middleware\\GuardSwitcher",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Middleware\/SubstituteBindings.php",
            "line": 41,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Routing\\Middleware\\SubstituteBindings",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 104,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 682,
            "function": "then",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 657,
            "function": "runRouteWithinStack",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 623,
            "function": "runRoute",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Router.php",
            "line": 612,
            "function": "dispatchToRoute",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Kernel.php",
            "line": 176,
            "function": "dispatch",
            "class": "Illuminate\\Routing\\Router",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 30,
            "function": "Illuminate\\Foundation\\Http\\{closure}",
            "class": "Illuminate\\Foundation\\Http\\Kernel",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/barryvdh\/laravel-debugbar\/src\/Middleware\/InjectDebugbar.php",
            "line": 58,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Barryvdh\\Debugbar\\Middleware\\InjectDebugbar",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/fruitcake\/laravel-cors\/src\/HandleCors.php",
            "line": 36,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Fruitcake\\Cors\\HandleCors",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/fideloper\/proxy\/src\/TrustProxies.php",
            "line": 57,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Fideloper\\Proxy\\TrustProxies",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/TransformsRequest.php",
            "line": 21,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/TransformsRequest.php",
            "line": 21,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\TransformsRequest",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/ValidatePostSize.php",
            "line": 27,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\ValidatePostSize",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Middleware\/CheckForMaintenanceMode.php",
            "line": 62,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 163,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Middleware\\CheckForMaintenanceMode",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Routing\/Pipeline.php",
            "line": 53,
            "function": "Illuminate\\Pipeline\\{closure}",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Pipeline\/Pipeline.php",
            "line": 104,
            "function": "Illuminate\\Routing\\{closure}",
            "class": "Illuminate\\Routing\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Kernel.php",
            "line": 151,
            "function": "then",
            "class": "Illuminate\\Pipeline\\Pipeline",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Http\/Kernel.php",
            "line": 116,
            "function": "sendRequestThroughRouter",
            "class": "Illuminate\\Foundation\\Http\\Kernel",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Strategies\/Responses\/ResponseCalls.php",
            "line": 307,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Http\\Kernel",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Strategies\/Responses\/ResponseCalls.php",
            "line": 289,
            "function": "callLaravelRoute",
            "class": "Mpociot\\ApiDoc\\Extracting\\Strategies\\Responses\\ResponseCalls",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Strategies\/Responses\/ResponseCalls.php",
            "line": 47,
            "function": "makeApiCall",
            "class": "Mpociot\\ApiDoc\\Extracting\\Strategies\\Responses\\ResponseCalls",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Generator.php",
            "line": 172,
            "function": "__invoke",
            "class": "Mpociot\\ApiDoc\\Extracting\\Strategies\\Responses\\ResponseCalls",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Generator.php",
            "line": 121,
            "function": "iterateThroughStrategies",
            "class": "Mpociot\\ApiDoc\\Extracting\\Generator",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Extracting\/Generator.php",
            "line": 84,
            "function": "fetchResponses",
            "class": "Mpociot\\ApiDoc\\Extracting\\Generator",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Commands\/GenerateDocumentation.php",
            "line": 125,
            "function": "processRoute",
            "class": "Mpociot\\ApiDoc\\Extracting\\Generator",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/mpociot\/laravel-apidoc-generator\/src\/Commands\/GenerateDocumentation.php",
            "line": 69,
            "function": "processRoutes",
            "class": "Mpociot\\ApiDoc\\Commands\\GenerateDocumentation",
            "type": "->"
        },
        {
            "function": "handle",
            "class": "Mpociot\\ApiDoc\\Commands\\GenerateDocumentation",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/BoundMethod.php",
            "line": 32,
            "function": "call_user_func_array"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/BoundMethod.php",
            "line": 90,
            "function": "Illuminate\\Container\\{closure}",
            "class": "Illuminate\\Container\\BoundMethod",
            "type": "::"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/BoundMethod.php",
            "line": 34,
            "function": "callBoundMethod",
            "class": "Illuminate\\Container\\BoundMethod",
            "type": "::"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Container\/Container.php",
            "line": 576,
            "function": "call",
            "class": "Illuminate\\Container\\BoundMethod",
            "type": "::"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Console\/Command.php",
            "line": 183,
            "function": "call",
            "class": "Illuminate\\Container\\Container",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Command\/Command.php",
            "line": 255,
            "function": "execute",
            "class": "Illuminate\\Console\\Command",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Console\/Command.php",
            "line": 170,
            "function": "run",
            "class": "Symfony\\Component\\Console\\Command\\Command",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Application.php",
            "line": 908,
            "function": "run",
            "class": "Illuminate\\Console\\Command",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Application.php",
            "line": 269,
            "function": "doRunCommand",
            "class": "Symfony\\Component\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/symfony\/console\/Application.php",
            "line": 145,
            "function": "doRun",
            "class": "Symfony\\Component\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Console\/Application.php",
            "line": 90,
            "function": "run",
            "class": "Symfony\\Component\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/vendor\/laravel\/framework\/src\/Illuminate\/Foundation\/Console\/Kernel.php",
            "line": 133,
            "function": "run",
            "class": "Illuminate\\Console\\Application",
            "type": "->"
        },
        {
            "file": "\/media\/psf\/Development\/hosts\/screentrack.com\/artisan",
            "line": 37,
            "function": "handle",
            "class": "Illuminate\\Foundation\\Console\\Kernel",
            "type": "->"
        }
    ]
}
```

### HTTP Request
`GET api/administrators/{administrator_id}/update`

`POST api/administrators/{administrator_id}/update`

`PUT api/administrators/{administrator_id}/update`

`PATCH api/administrators/{administrator_id}/update`

`DELETE api/administrators/{administrator_id}/update`

`OPTIONS api/administrators/{administrator_id}/update`


<!-- END_af33928fcd53fc6c0d5ce2708f8b4061 -->

<!-- START_a4861c8e22473fd992dbcb6aa905e6a7 -->
## api/administrators/{administrator_id}/delete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/administrators/1/delete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/administrators/1/delete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (200):

```json
{
    "data": null
}
```

### HTTP Request
`GET api/administrators/{administrator_id}/delete`


<!-- END_a4861c8e22473fd992dbcb6aa905e6a7 -->

<!-- START_e444486f5ef719860d02f7005b688880 -->
## api/coupons/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/coupons/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/coupons/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (422):

```json
{
    "error": "Validation",
    "validation_fields": {
        "coupon.name": [
            "The coupon.name field is required."
        ]
    }
}
```

### HTTP Request
`GET api/coupons/create`

`POST api/coupons/create`

`PUT api/coupons/create`

`PATCH api/coupons/create`

`DELETE api/coupons/create`

`OPTIONS api/coupons/create`


<!-- END_e444486f5ef719860d02f7005b688880 -->

<!-- START_ea1129f96e55a1a15c4cea815f83243f -->
## api/coupons/{coupon_id}/update
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/coupons/1/update" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/coupons/1/update"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (422):

```json
{
    "error": "Validation",
    "validation_fields": {
        "coupon.name": [
            "The coupon.name field is required."
        ]
    }
}
```

### HTTP Request
`GET api/coupons/{coupon_id}/update`

`POST api/coupons/{coupon_id}/update`

`PUT api/coupons/{coupon_id}/update`

`PATCH api/coupons/{coupon_id}/update`

`DELETE api/coupons/{coupon_id}/update`

`OPTIONS api/coupons/{coupon_id}/update`


<!-- END_ea1129f96e55a1a15c4cea815f83243f -->

<!-- START_e9b6abc3ffe8182a40252b35d1baa580 -->
## api/coupons/{coupon_id}/delete
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/coupons/1/delete" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/coupons/1/delete"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (404):

```json
{
    "error": "Not Found"
}
```

### HTTP Request
`GET api/coupons/{coupon_id}/delete`


<!-- END_e9b6abc3ffe8182a40252b35d1baa580 -->

<!-- START_30c72c5ce4ee8ea00d429b67ba926aee -->
## api/user_feedback/create
> Example request:

```bash
curl -X GET \
    -G "http://loc.screentrack.com/api/user_feedback/create" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json"
```

```javascript
const url = new URL(
    "http://loc.screentrack.com/api/user_feedback/create"
);

let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(json => console.log(json));
```


> Example response (422):

```json
{
    "error": "Validation",
    "validation_fields": {
        "user_feedback": [
            "The user feedback field is required."
        ],
        "user_feedback.text": [
            "The user feedback.text field is required."
        ]
    }
}
```

### HTTP Request
`GET api/user_feedback/create`

`POST api/user_feedback/create`

`PUT api/user_feedback/create`

`PATCH api/user_feedback/create`

`DELETE api/user_feedback/create`

`OPTIONS api/user_feedback/create`


<!-- END_30c72c5ce4ee8ea00d429b67ba926aee -->


