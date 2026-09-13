import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { handleApiError } from '../../core/utils/error.util';
import { STORAGE_KEYS } from '../../core/constants/storage-keys.const';
import { AuthResponseModel } from '../../core/models/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/users`;

  // ---------------- SIGNALS: internal reactive auth state ----------------
  private _token = signal<string | null>(this.readInitial(STORAGE_KEYS.TOKEN));
  private _name = signal<string | null>(this.readInitial(STORAGE_KEYS.NAME));
  private _role = signal<string | null>(this.readInitial(STORAGE_KEYS.ROLE));
  private _userId = signal<string | null>(this.readInitial(STORAGE_KEYS.USER_ID));

  // Public, read-only signals — new code (e.g. templates) can bind to these
  // directly for full reactivity instead of using the legacy getters below.
  readonly tokenSignal = this._token.asReadonly();
  readonly displayNameSignal = this._name.asReadonly();
  readonly roleSignal = this._role.asReadonly();
  readonly userIdSignal = this._userId.asReadonly();
  readonly isLoggedInSignal = computed(() => !!this._token());
  readonly isAdminSignal = computed(() => this._role()?.toLowerCase() === 'admin');

  constructor(private http: HttpClient) {
    // effect(): whenever any auth signal changes (login, logout, or a manual
    // set), automatically sync the new value to localStorage. This replaces
    // the old manual localStorage.setItem/removeItem calls scattered across
    // login() and logout() with a single side effect that reacts to state.
    effect(() => {
      if (typeof window === 'undefined') return;

      const token = this._token();
      const name = this._name();
      const role = this._role();
      const userId = this._userId();

      this.syncKey(STORAGE_KEYS.TOKEN, token);
      this.syncKey(STORAGE_KEYS.NAME, name);
      this.syncKey(STORAGE_KEYS.ROLE, role);
      this.syncKey(STORAGE_KEYS.USER_ID, userId);
    });
  }

  private readInitial(key: string): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  }

  private syncKey(key: string, value: string | null): void {
    if (value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  }

  // ---------------- LOGIN ----------------
  login(email: string, password: string): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((res: AuthResponseModel) => {
        // Updating the signals is now the only thing needed here —
        // the effect() above handles persisting to localStorage automatically.
        this._token.set(res.token || '');
        this._name.set(res.user?.name || '');
        this._role.set(res.user?.role || '');
        this._userId.set(res.user?.id?.toString() || '');
      }),
      handleApiError('Login')
    );
  }

  // ---------------- REGISTER ----------------
  register(user: { firstname: string; lastname: string; phonenumber: string; email: string; password: string; role?: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user)
      .pipe(handleApiError('Register'));
  }

  // ---------------- LOGOUT ----------------
  logout(): void {
    // Setting each signal to null triggers the effect(), which then removes
    // the corresponding localStorage key automatically.
    this._token.set(null);
    this._name.set(null);
    this._role.set(null);
    this._userId.set(null);
  }

  // ---------------- LEGACY GETTERS (unchanged API, signal-backed internally) ----------------
  getToken(): string | null {
    return this._token();
  }

  get userId(): string | null {
    return this._userId();
  }

  get displayName(): string | null {
    return this._name();
  }

  get role(): string | null {
    return this._role();
  }

  get isAdmin(): boolean {
    return this.isAdminSignal();
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSignal();
  }
}