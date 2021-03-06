import Utils from '../../utils/utils';
import Dialog from './dialog-class';
import ModalMethods from '../../utils/modal-methods';

export default {
  name: 'dialog',
  params: {
    dialog: {
      title: 'Framework7',
      buttonOk: 'OK',
      buttonCancel: 'Cancel',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      preloaderTitle: 'Loading... ',
      progressTitle: 'Loading... ',
      closeByBackdropClick: false,
    },
  },
  static: {
    Dialog,
  },
  create() {
    const app = this;
    app.dialog = Utils.extend(
      ModalMethods({
        app,
        constructor: Dialog,
        defaultSelector: '.dialog.modal-in',
      }),
      {
        // Shortcuts
        alert(...args) {
          let [text, title, callbackOk] = args;
          if (args.length === 2 && typeof args[1] === 'function') {
            [text, callbackOk, title] = args;
          }
          return new Dialog(app, {
            title: typeof title === 'undefined' ? app.params.dialog.title : title,
            text,
            buttons: [{
              text: app.params.dialog.buttonOk,
              bold: true,
              onClick: callbackOk,
            }],
          }).open();
        },
        prompt(...args) {
          let [text, title, callbackOk, callbackCancel] = args;
          if (typeof args[1] === 'function') {
            [text, callbackOk, callbackCancel, title] = args;
          }
          return new Dialog(app, {
            title: typeof title === 'undefined' ? app.params.dialog.title : title,
            text,
            content: '<div class="dialog-input-field item-input"><div class="item-input-wrap"><input type="text" class="dialog-input"></div></div>',
            buttons: [
              {
                text: app.params.dialog.buttonCancel,
              },
              {
                text: app.params.dialog.buttonOk,
                bold: true,
              },
            ],
            onClick(dialog, index) {
              const inputValue = dialog.$el.find('.dialog-input').val();
              if (index === 0 && callbackCancel) callbackCancel(inputValue);
              if (index === 1 && callbackOk) callbackOk(inputValue);
            },
          }).open();
        },
        confirm(...args) {
          let [text, title, callbackOk, callbackCancel] = args;
          if (typeof args[1] === 'function') {
            [text, callbackOk, callbackCancel, title] = args;
          }
          return new Dialog(app, {
            title: typeof title === 'undefined' ? app.params.dialog.title : title,
            text,
            buttons: [
              {
                text: app.params.dialog.buttonCancel,
                onClick: callbackCancel,
              },
              {
                text: app.params.dialog.buttonOk,
                bold: true,
                onClick: callbackOk,
              },
            ],
          }).open();
        },
        login(...args) {
          let [text, title, callbackOk, callbackCancel] = args;
          if (typeof args[1] === 'function') {
            [text, callbackOk, callbackCancel, title] = args;
          }
          return new Dialog(app, {
            title: typeof title === 'undefined' ? app.params.dialog.title : title,
            text,
            content: `
              <div class="dialog-input-field dialog-input-double item-input">
                <div class="item-input-wrap">
                  <input type="text" name="dialog-username" placeholder="${app.params.dialog.usernamePlaceholder}" class="dialog-input">
                </div>
              </div>
              <div class="dialog-input-field dialog-input-double item-input">
                <div class="item-input-wrap">
                  <input type="password" name="dialog-password" placeholder="${app.params.dialog.passwordPlaceholder}" class="dialog-input">
                </div>
              </div>`,
            buttons: [
              {
                text: app.params.dialog.buttonCancel,
              },
              {
                text: app.params.dialog.buttonOk,
                bold: true,
              },
            ],
            onClick(dialog, index) {
              const username = dialog.$el.find('[name="dialog-username"]').val();
              const password = dialog.$el.find('[name="dialog-password"]').val();
              if (index === 0 && callbackCancel) callbackCancel(username, password);
              if (index === 1 && callbackOk) callbackOk(username, password);
            },
          }).open();
        },
        password(...args) {
          let [text, title, callbackOk, callbackCancel] = args;
          if (typeof args[1] === 'function') {
            [text, callbackOk, callbackCancel, title] = args;
          }
          return new Dialog(app, {
            title: typeof title === 'undefined' ? app.params.dialog.title : title,
            text,
            content: `
              <div class="dialog-input-field item-input">
                <div class="item-input-wrap">
                  <input type="password" name="dialog-password" placeholder="${app.params.dialog.passwordPlaceholder}" class="dialog-input">
                </div>
              </div>`,
            buttons: [
              {
                text: app.params.dialog.buttonCancel,
              },
              {
                text: app.params.dialog.buttonOk,
                bold: true,
              },
            ],
            onClick(dialog, index) {
              const password = dialog.$el.find('[name="dialog-password"]').val();
              if (index === 0 && callbackCancel) callbackCancel(password);
              if (index === 1 && callbackOk) callbackOk(password);
            },
          }).open();
        },
        preloader(title) {
          const preloaderInner = app.theme !== 'md' ? '' :
            '<span class="preloader-inner">' +
                '<span class="preloader-inner-gap"></span>' +
                '<span class="preloader-inner-left">' +
                    '<span class="preloader-inner-half-circle"></span>' +
                '</span>' +
                '<span class="preloader-inner-right">' +
                    '<span class="preloader-inner-half-circle"></span>' +
                '</span>' +
            '</span>';
          return new Dialog(app, {
            title: typeof title === 'undefined' ? app.params.dialog.preloaderTitle : title,
            content: `<div class="preloader">${preloaderInner}</div>`,
            cssClass: 'dialog-preloader',
          }).open();
        },
        progress(...args) {
          let [title, progress, color] = args;
          if (args.length === 2) {
            if (typeof args[0] === 'number') {
              [progress, color, title] = args;
            } else if (typeof args[0] === 'string' && typeof args[1] === 'string') {
              [title, color, progress] = args;
            }
          } else if (args.length === 1) {
            if (typeof args[0] === 'number') {
              [progress, title, color] = args;
            }
          }
          const infinite = typeof progress === 'undefined';
          const dialog = new Dialog(app, {
            title: typeof title === 'undefined' ? app.params.dialog.progressTitle : title,
            cssClass: 'dialog-progress',
            content: `
              <div class="progressbar${infinite ? '-infinite' : ''}${color ? ` color-${color}` : ''}">
                ${!infinite ? '<span></span>' : ''}
              </div>
            `,
          });
          if (!infinite) dialog.setProgress(progress);
          return dialog.open();
        },
      }
    );
  },
  clicks: {
    '.dialog-backdrop': function closeDialog() {
      const app = this;
      if (!app.params.dialog.closeByBackdropClick) return;
      app.dialog.close();
    },
  },
};
