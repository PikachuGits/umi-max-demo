import { IApi } from '@umijs/max';
export default (api: IApi) => {
  api.describe({
    key: 'customLoading',
    config: {
      schema(joi) {
        return joi.string();
      },
    },
    enableBy: api.EnableBy.config,
  });

  // api.addEntryCode(() => `console.log('I am after render!');`);
  // api.addHTMLHeadScripts(() => `console.log(document.getElementById('rootContainerLoading')) `);

  // const loadingDiv = `
  //   <div
  //     id="rootContainerLoading"
  //     style="
  //       position: absolute;
  //       z-index: 999999;
  //       top: 0;
  //       left: 0;
  //       width: 100vw;
  //       height: 100vh;
  //       background: red;
  //     "
  //   >
  //     loading
  //   </div>
  // `;
  // api.modifyHTML(($, { path }) => {
  //   $('body').append(loadingDiv);
  //   console.log('modifyHTML');
  //
  //   return $;
  // });

  // // before
  // api.addEntryCodeAhead(() => {
  //   return `
  //         // 选中 body 元素
  //       const body = document.querySelector('body');
  //
  //       // 创建一个新的 div
  //       const loadingDiv = document.createElement('div');
  //       loadingDiv.id = 'rootContainerLoading';
  //       loadingDiv.style.position = 'absolute';
  //       loadingDiv.style.zIndex = '999999';
  //       loadingDiv.style.top = '0';
  //       loadingDiv.style.left = '0';
  //       loadingDiv.style.width = '100vw';
  //       loadingDiv.style.height = '100vh';
  //       loadingDiv.style.background = 'red';
  //       loadingDiv.textContent = 'loading';
  //
  //       // 在 body 的开头插入该 div
  //       body.insertBefore(loadingDiv, body.firstChild);
  // `;
  // });
  //
  // //after
  // api.addEntryCode(
  //   () => `
  //   // 删除刚刚插入的 div
  //   setTimeout(() => {
  //     const divToRemove = document.getElementById('rootContainerLoading');
  //     if (divToRemove) {
  //       divToRemove.remove();
  //     }
  //   }, 2000); // 2秒后删除
  // `,
  // );

  // api.modifyRoutes((memo) => {
  //   console.log('memo', memo);
  //   return memo;
  // });
};
