<<<<<<< HEAD
import { inject } from '@angular/core';
import { user } from '@angular/fire/auth';
import { CanMatchFn } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const authGuard: CanMatchFn = async (route, segments) => {
  try {
    const auth = inject(AuthService);

    const user = await auth.checkAuth();
  
    if(user){
      return true;
    }
  
    auth.navigateByUrl('/login');
    return false;
  } catch(e) {
    console.error('Auth guard error:', e);
    throw e;
  }
 
};
=======
import { inject } from '@angular/core';
import { user } from '@angular/fire/auth';
import { CanMatchFn } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const authGuard: CanMatchFn = async (route, segments) => {
  try {
    const auth = inject(AuthService);

    const user = await auth.checkAuth();
  
    if(user){
      return true;
    }
  
    auth.navigateByUrl('/login');
    return false;
  } catch(e) {
    console.error('Auth guard error:', e);
    throw e;
  }
 
};
>>>>>>> 6696688f7c9b5c348538fe38556b2ca217b986ae
