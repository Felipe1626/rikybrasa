import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { environment } from '../models/environment';


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  constructor() { }
}
