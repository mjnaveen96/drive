(function () {
  angular
  .module('magicTree')
  .directive('treeDirective',treeDirectiveFun);
  treeDirectiveFun.$inject = ['$http'];
  function treeDirectiveFun($http) {
    return{
      link : treeFun,
      templateUrl:"app/tree/Templates/treeTemplate.html"
    }
    function treeFun(scope,element,attrs) {
      dat=scope.empId;
      scope.data;
      scope.treeArr=[];
      scope.childArr = [];
$http({
  method: 'GET',
  url:'maindata.json'
}).then(function(response) {
  scope.data=response.data;
  console.log(scope.data);

})

scope.search=function(id){
 console.log("hello");
 let found=0;
 for(i=0;i<scope.data.length;i++)
 {
    if((scope.data[i].id) === (id))
    {
      found=1;
     scope.treeArr.push(scope.data[i]);
     scope.childArr.push(scope.data[i].Children);
     console.log(scope.data[i].id);
     break;
      }
   else if(found==0)
   {
     for(j=0;j<scope.data[i].items.length;j++)
     {
       if((scope.data[i].items[j].id) === (id))
       {
         found=1;
         scope.treeArr.push(scope.data[i]);
         scope.treeArr.push(scope.data[i].items[j]);
         scope.childArr.push(scope.data[i].items[j].Children);
         console.log(scope.data[i].items[j].id);
         break;
       }
       else if(found==0)
       {
         for(k=0;k<scope.data[i].items[j].items.length;k++)
         {
            if ((scope.data[i].items[j].items[k].id) === (id))
            {
              found=1;
              scope.treeArr.push(scope.data[i]);
              scope.treeArr.push(scope.data[i].items[j]);
              scope.treeArr.push(scope.data[i].items[j].items[k]);
              scope.childArr.push(scope.data[i].items[j].items[k].Children);
               console.log(scope.data[i].items[j].items[k].id);
               break;
            }
            else if(found===0)
            {
              console.log("not in file");
              // found=0;
            }
         }
       }

     }
   }
 }
}

scope.getChild = function(id) {
  scope.search(id);
  console.log(scope.childArr);
}


    }

  }
})();
