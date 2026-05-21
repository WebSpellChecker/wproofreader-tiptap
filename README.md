WProofreader extension for Tiptap
===================================

The multilingual spelling and grammar checking solution for Tiptap editor version 3. It provides both instant and in-dialog proofreading modes in a convenient UI.

WProofreader extension for Tiptap inherits all functionality of the WProofreader component with slight adaptation to the view and features of the editor. For more details, visit the [WProofreader repo](https://github.com/WebSpellChecker/wproofreader) or [official web page](https://webspellchecker.com/wsc-proofreader/).

## Table of contents

* [Before you start](#before-you-start)
* [Install instructions](#install-instructions)
* [Commands](#commands)
* [Documentation](#documentation)
* [Reporting issues](#reporting-issues)
* [Technical support or questions](#technical-support-or-questions)
* [License](#license)

## Before you start

The Tiptap extension is a frontend component that connects to the WProofreader service, so an active WProofreader SDK subscription is required to use it. New users can [sign up](https://wproofreader.com/sdk#pricing) for the SDK, where a free plan with basic spelling and grammar check and a daily usage limit is available. After signing up, your **service ID** will be on the [Credentials page](https://app.wproofreader.com/credentials).

Existing clients of the cloud version use the same service ID from the Credentials page, while clients of the self-hosted version point the extension to their service endpoint (see the server-based configuration example below).

## Install instructions

1. Install the extension.

	To install the extension, run the following command:

	```
	npm install @webspellchecker/wproofreader-tiptap
	```

	Import the WProofreader extension into the project. Then, add it to the `extensions` array and configure.

	```js
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import WProofreader from '@webspellchecker/wproofreader-tiptap';
	...

	new Editor({
		element: document.querySelector('.editorElement'),
		extensions: [
			StarterKit,
			WProofreader.configure({
				wproofreader: {
					/* config of WProofreader */
				}
			})
		],
		content: '<p>Hello World!</p>'
	})
	```

2. Configure the extension.

	After installing the extension, you need to configure it in the Tiptap setup. The configuration is added to the `wproofreader` field. For a detailed list of available customization options, refer to the [Configuration reference](https://webspellchecker.com/docs/api/wscbundle/Options.html).

	For the **Cloud-based** version of WProofreader:

	```js
	wproofreader: {
		serviceId: 'your-service-ID' // required for the Cloud version only
	}
	```

	`serviceId` is a mandatory parameter for activating and using the extension pointed to the Cloud-based version of WProofreader. You can find your service ID on the [Credentials page](https://app.wproofreader.com/credentials), or [sign up](https://wproofreader.com/sdk#pricing) to receive one.

	For the **Server-based** version of WProofreader:

	```js
	wproofreader: {
		serviceProtocol: 'https',
		serviceHost: 'localhost',
		servicePort: '443',
		servicePath: 'virtual_directory/api', // by default the virtual_directory is wscservice
		srcUrl: 'https://host_name/virtual_directory/wscbundle/wscbundle.js'
	}
	```

	Unlike the Cloud-based version, the `serviceId` parameter is not used here. Instead, it is required to specify the path to the backend entry point hosted on the client’s infrastructure.

## Commands

* `enableWProofreader` - Enables the WProofreader functionality.
* `disableWProofreader` - Disables the WProofreader functionality.
* `toggleWProofreader` - Toggles the WProofreader functionality.
* `openWProofreaderSettings` - Opens the WProofreader settings.
* `openWProofreaderDialog` - Opens the WProofreader dialog.

## Documentation

To find out more, refer to the following documentation:

* [WProofreader Configuration reference](https://webspellchecker.com/docs/api/wscbundle/Options.html)
* [Tiptap documentation](https://tiptap.dev/docs)

## Reporting issues

We use GitHub Issues as the official public bug tracker for WProofreader extension for Tiptap. Here are some recommendations to take into account when reporting an issue:

* Provide steps which help us to reproduce an issue. A sample page or JSFiddle is always welcomed.
* Some issues may be browser and integration-specific. So, please specify what browser and integration you encountered the issue with.

## Technical support or questions

Holders of an active subscription to the services or a commercial license have access to professional technical assistance directly from the support team. [Contact us here](https://webspellchecker.com/contact-us/).

## License

Licensed under the terms of the MIT license. For full details about the license, please check the `LICENSE.md` file.
