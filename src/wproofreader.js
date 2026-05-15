import { Extension } from '@tiptap/core';
import WProofreaderSDK from '@webspellchecker/wproofreader-sdk-js';

export const WProofreader = Extension.create({
	name: 'wproofreader',

	addOptions() {
		return { wproofreader: {} };
	},

	addStorage() {
		return { instance: null };
	},

	addCommands() {
		return {
			enableWProofreader: () => ({ commands }) => {
				commands.setMeta('addToHistory', false);
				commands.setMeta('preventUpdate', true);

				this.storage.instance?.enable();
			},
			disableWProofreader: () => ({ commands }) => {
				commands.setMeta('addToHistory', false);
				commands.setMeta('preventUpdate', true);

				this.storage.instance?.disable();
			},
			toggleWProofreader: () => ({ commands }) => {
				commands.setMeta('addToHistory', false);
				commands.setMeta('preventUpdate', true);

				if (this.storage.instance) {
					this.storage.instance.isDisabled()
						? this.storage.instance.enable()
						: this.storage.instance.disable();
				}
			},
			openWProofreaderSettings: () => ({ commands }) => {
				commands.setMeta('addToHistory', false);
				commands.setMeta('preventUpdate', true);

				if (this.storage.instance) {
					!this.storage.instance.isDisabled() && this.storage.instance.openSettings();
				}
			},
			openWProofreaderDialog: () => ({ commands }) => {
				commands.setMeta('addToHistory', false);
				commands.setMeta('preventUpdate', true);

				if (this.storage.instance) {
					!this.storage.instance.isDisabled() && this.storage.instance.openDialog();
				}
			}
		}
	},

	onCreate() {
		WProofreaderSDK
			.init({
				...this.options.wproofreader,
				container: this.editor.view.dom,
				appType: 'wpr_tiptap'
			})
			.then(instance => {
				if (this.editor.isDestroyed) {
					instance.destroy();

					return;
				}

				if (!this.editor.isEditable) {
					instance.disable();
				}

				this.storage.instance = instance;
			});
	},

	onUpdate() {
		this.editor.isEditable
			? this.storage.instance?.enable()
			: this.storage.instance?.disable();
	},

	onDestroy() {
		this.storage.instance?.destroy();
		this.storage.instance = null;
	}
});
