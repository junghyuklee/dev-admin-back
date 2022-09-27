import { Injectable, Scope, Inject } from '@nestjs/common';
import { Users } from '../users/entities/Users.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class SessionService {
  constructor(@Inject(REQUEST) private request: Request) {}

  private session(): any {
    return this.request.session;
  }

  get user(): Users {
    return this.session().user;
  }

  set user(user: Users) {
    this.session().user = user;
  }
}
