import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class BotService {
    constructor(private http: HttpClient) {}

    sendCommand(command: string, parameter: string) {
        return this.http.post("https://localhost:44356/api/v1/command", { name: command, parameter: parameter });
    }
}