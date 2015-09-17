angular
  .module('final-project')
  .directive('infiniteScroll', InfiniteScroll);

InfiniteScroll.$inject = ['$window', '$timeout']
function InfiniteScroll($window, $timeout){
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      if (scope.$last === true) {
        $timeout(function () {
          scope.$emit('ngRepeatFinished');
        });
      }
    }
  }
}