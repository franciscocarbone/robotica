'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';
import _ from "lodash";


export default class PropuestasDeTallerComponent extends SocialComponent{
    /*@ngInject*/
    constructor($element, $log, $rootScope, $q,  $stateParams, $state, Auth, Restangular,$mdDialog,$mdMedia,$scope,$mdBottomSheet) {

        super({$element});
        this.$q = $q;
        this.$state = $state;
        this.$rootScope = $rootScope;
        this.page = 0;
        this.limit = 20;
        this.Auth = Auth;
        this.Restangular = Restangular;
        this.user = this.getUser();
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.section = $stateParams.type;
        this.searchText = $stateParams.search;
        this.muestraFiltroMobile= false;
      
        this.$mdDialog = $mdDialog;
       
        this.area;
        this.areaEmergente;
        this.anio;
        $scope.$mdMedia = $mdMedia;
        this.resetWaterfall;
        this.intensivos = true;
      
         this.Publisheds = this.Restangular.all('publishedOrientacionPedagogica');
      

      
        var tiposOr = [
            {name: 'all'  ,   desc: "Sin Filtro" },
            {name: 'danza'  ,   desc: "Danza" },
            {name: 'fisica',     desc: "Fisica" },
            {name: 'ingles'         , desc: "Ingles" },
            {name: 'lengua'         , desc: "Lengua" },
            {name: 'matematica'         , desc: "Matematica" },
            {name: 'musica'         , desc: "Musica" },
            {name: 'naturales'         , desc: "Cs Naturales" },
            {name: 'plastica'         , desc: "Plastica" },
            {name: 'sociales'         , desc: "Cs Sociales" },
            {name: 'teatro'          , desc: "Teatro" }
         ];


         this.orientacionesFiltro =[].concat(tiposOr);            
         

         this.$scope.$watch(() => { return $mdMedia('xs') }, (mobile) => {
            this.isMobile = mobile === true;    
            this.muestraFiltroMobile=false;  
          });

          this.$scope.$watch( this.area, function(){
            console.log(this); 
          });


    }

       

    getUser(){
        this.Auth
            .getCurrentUser()
            .then(user => {
                this.user = user;
                this.username = user.name;
            });
    }


      fetchDataFilter(value){
          this.page=0;
        this.resetWaterfall= Math.random();
      }

    fetchData(){
        let def = this.$q.defer();
        this.page++;
        let q;
        if (this.searchText){
            q = this.searchText
        }

        this.Publisheds
            .getList({
                page: this.page, 
                limit: this.limit,
                type: 'orientacionpedagogica',
                area:this.area,               
                anio:this.anio,
                intensivo: true
            })
            .then(data => {
                let total = data.$total;
          
                let res = {
                    count: total,
                    items: data,
                    page: this.page,
                    limit: this.limit
                };
    
                def.resolve(res);
            })

        return def.promise;
    }

    


}