import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule  } from '@angular/http';

import { requestOptionsProvider }   from './default-request-options.service';
import { HeroService } from './hero.service';
import { UserService } from './user.service';
import { SocketService} from './socket.service'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    JsonpModule,
    HttpModule
  ],
  providers: [requestOptionsProvider, HeroService, UserService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
