import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { theme } from 'src/app/models/theme';
import { user } from 'src/app/models/user';
import { GetThemeService } from '../../../services/get-theme.service';
import { SignupService } from '../../../services/signup.service';
import * as MD5 from 'md5';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  public knowledgeList: theme[];
  public miPerfil: user;
  public elegidos: theme[];
  public selectedInterest: theme;
  public selectedKnowledge: theme;
  public listImages: string[];
  public urlServer: string = 'https://learn-and-trade-backend.herokuapp.com/';
  public numImages: number = 12;
  public selectedImage: string;




  constructor(private formBuilder: FormBuilder, private ThemeService: GetThemeService, private SignupService:SignupService) { }

  ngOnInit(): void {
    let lista = [];
    for(let i=0; i<this.numImages;i++){
      lista[i] = this.urlServer + (i+1) + '.jpg';
    }
    this.listImages = lista;
    this.selectedImage = this.listImages[0];

    this.miPerfil = {
      username: '',
      email: '',
      interests: [],
      knowledges: [],
      name: '',
      surname: '',
      imageUrl: '',
      password: '',
      birthDate: new Date
    };


    this.signupForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      user:[''],
      email:[''],
      image:[''],
      date:[''],
      pass: ['']
    });

    this.getThemes();
    this.elegidos = this.miPerfil.interests;
  }

  signup(){
    let fecha = new Date;
    var newUser = {
      username: this.signupForm.controls['user'].value,
      email:this.signupForm.controls['email'].value,
      interests:this.miPerfil.interests,
      knowledges:this.miPerfil.knowledges,
      name:this.signupForm.controls['name'].value,
      imageUrl: this.miPerfil.imageUrl,
      surname: this.signupForm.controls['surname'].value,
      birthDate: this.signupForm.controls['date'].value,
      password: MD5(this.signupForm.controls['pass'].value)
    }
    this.SignupService.createUser(newUser).subscribe(
      response => {
        console.log("CREADO");
        console.log(response);
      },
      error => {
        console.log("ERROR")
      }
    );



  }
  imageSelected(image){
    this.miPerfil.imageUrl = image;
  }
  getThemes(){
    this.ThemeService.getTheme().subscribe(
      response => {
        this.knowledgeList = response;
        console.log(this.knowledgeList);
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
        }
      }
    );
  }

  addInterest(interest){
    let esRepetido = false;
    if(interest){
      for(let i=0; i<this.miPerfil.interests.length; i++){
        if(interest.name == this.miPerfil.interests[i].name){
          esRepetido = true;
        }
      }
      if(!esRepetido){
        console.log("Es nuevo, añadir");
        this.miPerfil.interests.push(interest);
      }
      console.log("DESPUES")
      console.log(this.elegidos);
    }
    else{
      console.log("ANTES:");
      console.log(interest);
    }
  }

  addKnowledge(knowledge){
    let esRepetido = false;
    if(knowledge){
      for(let i=0; i<this.miPerfil.knowledges.length; i++){
        if(knowledge == this.miPerfil.knowledges[i]){
          esRepetido = true;
        }
      }
      if(!esRepetido){
        console.log("Es nuevo, añadir");
        this.miPerfil.knowledges.push(knowledge);
      }
      console.log("DESPUES")
      console.log(this.miPerfil.knowledges);
    }
    else{
      console.log("ANTES:");
      console.log(knowledge);
    }
  }

  deleteInterest(interest){
    let indice = this.miPerfil.interests.indexOf(interest);
    this.miPerfil.interests.splice(indice,1);
  }

  deleteKnowledge(knowledge){
    let indice = this.miPerfil.knowledges.indexOf(knowledge);
    this.miPerfil.knowledges.splice(indice,1);
  }

}
