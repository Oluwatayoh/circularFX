import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "./data.service";

@Injectable()
export class CommodityResolver implements Resolve<Observable<any[]>> {
    constructor(private _data: DataService) { }
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
        return this._data.getData();
    }
}