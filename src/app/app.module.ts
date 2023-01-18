import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './routes/inicio/inicio.component';
import { LoadingComponent } from './components/loading/loading.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { RegistroComponent } from './routes/registro/registro.component';
import { IngresoComponent } from './routes/ingreso/ingreso.component';

@NgModule({
  declarations: [AppComponent, InicioComponent, LoadingComponent, RegistroComponent, IngresoComponent],
  imports: [BrowserModule, AppRoutingModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
