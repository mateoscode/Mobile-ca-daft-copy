import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Identity } from './service/identity/identity';

export const authGuard: CanMatchFn = () => {
  const identity = inject(Identity);
  const router = inject(Router);

  return identity.user$.pipe(
    take(1),
    map((user) => {
      if (user) {
        return true;
      }
      router.navigateByUrl('/login', { replaceUrl: true });
      return false;
    })
  );
};
