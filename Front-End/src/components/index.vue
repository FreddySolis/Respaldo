<template>
<div >

 <v-data-table
    dark
    :headers="headers"
    :items="usuario"
    class="elevation-1"

  >
  
    <template slot="headerCell" slot-scope="props" >
      <v-tooltip   bottom>
        <span  slot="activator">
          {{ props.header.text }}
        </span>
        <span >
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
      
       <td   class="text-xs-left" >{{props.item.id}}</td>
      <td class="text-xs-left" >{{props.item.name}}</td>
      <td class="text-xs-left">{{props.item.name_db}}</td>
      <td class="text-xs-left">{{props.item.user_db}}</td>
      <td class="text-xs-left">{{props.item.password_db}}</td>
      <td class="text-xs-left">{{props.item.date_backup}}</td>
      <td class="text-xs-left">{{props.item.time_backup}}</td>
         <td class="text-xs-left"><v-btn @click="SendMessage(props.item)"> Respaldar</v-btn></td>
            <td class="text-xs-left ">
              
          
              
               <router-link  :to="{ path: 'editar/'+props.item.id }">
<h4 >Editar  </h4>  </router-link>
          
            
<button @click="eliminar(props.item.id)">  Eliminar</button>  
       
              
              </td>

    </template>
  </v-data-table>
   <router-link :to="{ path: 'new' }">
          <v-btn Style="margin-left:43%;width:15%" color="red">Nuevo</v-btn>
  </router-link>
</div>
 
</template>

<script>
import Ws from '@adonisjs/websocket-client'
const ws = Ws('ws://localhost:3333')
import Question from './editar.vue';
import Push from 'push.js';
export default {
  props: [' parametro ']
   
 ,
    data () {
      return {
        parametro:null,
        usuario:[],
        chat:null,
    inputMessage:'...' ,
    messages:['..'],
    chat:null,
    id:'',
 headers: [
          {
            text: 'id',
            align: 'left',
            sortable: false,
        
          },
          
          { text: 'name',     sortable: false, },
          { text: 'name_bd',      sortable: false,},
          { text: 'user_db',     sortable: false,},
          { text: 'password_db',     sortable: false,},
           { text: 'date_backup',      sortable: false,},
            { text: 'time_backup',     sortable: false,},
             { text: 'status',     sortable: false,},
              { text: 'editar o eliminar',     sortable: false,},
        ],
        
      }
    },
     async created(){
this.initializeChatws()
  },
    methods:{
    eliminar(id){
  this.$http.delete("http://127.0.0.1:3333/api/V1/settings/"+id).then(response => {
      this.$http.get("http://127.0.0.1:3333/api/V1/settings").then(function (params) {
  this.usuario=params.body;
  console.log(usuario)
 
});
      });
     },
  
  initializeChatws :async function(){
      ws.connect()   
      this.chat=ws.subscribe('setting')
      let chat=this.chat
      
      chat.on('ready', () => {
    console.log('inicio')
      })
      chat.on('message',(event)=>{
      this.ReseiveMenssage(event)
      })
      
    },
     ReseiveMenssage: async function(msg){
      this.messages.push(msg);
      var test = msg.name_bd;
      Push.create("Respaldo realizado",{
        body: "Respaldo listo",
        icon: './',
        timeout: 4000,
        onClick:function(){
          window.focus();
          this.close();
        }
      });
    },
    SendMessage: async function (message) {
    this.chat.emit('message',message)
    console.log(message)
    },
},
mounted(){
  
this.$http.get("http://127.0.0.1:3333/api/V1/settings").then(function (params) {
  this.usuario=params.body;
  console.log(this.usuario)
 
});
    },
     
   
  }
</script>