<template>
  <div>
    <div>
      <v-app id="inspire">
        <v-content>
          <v-container fluid fill-height>
            <v-layout align-center justify-center>
              <v-flex xs12 sm8 md4>
                <v-card light class="elevation-12">
                  <v-toolbar light color="blue">
                    <v-toolbar-title style="margin-left:30%;" justify-center>Editar base de datos</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      
                      <div>
                        <v-text-field v-model="nombre" name="nombre" label="Nombre" type="text"></v-text-field>
                      </div>

                      <div>
                        <v-text-field v-model="nombre2" name="nombre2" label="Nombre_db" type="text"></v-text-field>
                      </div>
                      <div>
                        <v-text-field v-model="usuario" name="usuario" label="Usuario" type="text"></v-text-field>
                      </div>
                       <div>
                        <v-text-field v-model="password" name="password" label="Password" type="text"></v-text-field>
                      </div>
                       <div>
                        <v-text-field v-model="fecha" name="fecha" label="Fecha" type="date"></v-text-field>
                      </div>
                       <div>
                        <v-text-field v-model="hora" name="hora" label="hora" type="time"></v-text-field>
                      </div>

                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn     block @click="createQ()"  color="blue" style="margin-right:30%"   dark >update</v-btn>
                     <router-link :to="{ path: '/' }">
                      <v-btn color="red" style="margin-right:15%" light >regresar</v-btn>
                    </router-link>
                  </v-card-actions>
                  <br>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>
      </v-app>
    </div>
  </div>
</template>
<script>
export default {
 
   data() {
    return {
       
      nombre:this.nombre,
      nombre2:this.nombre2,
      usuario:this.usuario,
      password:this.password,
    
      fecha:this.fecha,
      hora:this.hora,  

      }
      
    },
    mounted(){
      var app=this;
      this.$http.get("http://127.0.0.1:3333/api/V1/settings/"+this.$route.params.id).then(function(response){
       app.nombre= response.data.name;
       app.nombre2= response.data.name_db;
       app.usuario= response.data.user_db;
       app.password=response.data.password_db;
       app.fecha=response.data.date_backup;
       app.hora=response.data.time_backup;

       console.log(response)
      });
    },
    methods: {
    createQ() {
      let data = {
      'name':this.nombre,
      'name_db':this.nombre2,
      'user_db':this.usuario,
      'password_db':this.password,
      'date_backup':this.fecha,
      'time_backup':this.hora,  
      };

   this.$http.put("http://127.0.0.1:3333/api/V1/settings/"+this.$route.params.id,data).then((response)=> {
        console.log(response);
        this.$router.push({path:'/'});
      });
    }
    }
};
</script>
