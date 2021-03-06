/* eslint camelcase: "off" */
import templateUrl from './list.html';

/** @ngInject */
export function DialogsListState(routerHelper) {
  routerHelper.configureStates(getStates());
}

function getStates() {
  return {
    'dialogs.list': {
      url: '', // No url, this state is the index of dialogs
      templateUrl,
      controller: DialogsController,
      controllerAs: 'vm',
      title: N_('Dialog List'),
      resolve: {
        dialogs: resolveDialogs,
      },
    },
  };
}

/** @ngInject */
function resolveDialogs(CollectionsApi) {
  var options = {
    expand: 'resources',
    attributes: 'bundle',
  };

  return CollectionsApi.query('service_dialogs', options);
}

/** @ngInject */
function DialogsController(dialogs) {
  var vm = this;
  vm.dialogs = dialogs.resources;
}
