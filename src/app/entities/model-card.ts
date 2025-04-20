export class ModelCard {
  private _icon:string
  private _background:string
  private _fullname:string
  private _address:string
  private _socialStatus: { int : number , description : string} []
  private _skills: string []

  constructor(icon: string, background: string, fullname: string, address: string, socialStatus: {
    int: number;
    description: string
  }[], skills: string[]) {
    this._icon = icon;
    this._background = background;
    this._fullname = fullname;
    this._address = address;
    this._socialStatus = socialStatus;
    this._skills = skills;
  }

  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }

  get background(): string {
    return this._background;
  }

  set background(value: string) {
    this._background = value;
  }

  get fullname(): string {
    return this._fullname;
  }

  set fullname(value: string) {
    this._fullname = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get socialStatus(): { int: number; description: string }[] {
    return this._socialStatus;
  }

  set socialStatus(value: { int: number; description: string }[]) {
    this._socialStatus = value;
  }

  get skills(): string[] {
    return this._skills;
  }

  set skills(value: string[]) {
    this._skills = value;
  }
}
