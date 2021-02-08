import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BotService {
    constructor(private http: HttpClient) { }

    sendCommand(command: string, parameter: string) {
        return this.http.post(environment.botApiUrl + "/api/v1/command", { name: command, parameter: parameter });
    }
}