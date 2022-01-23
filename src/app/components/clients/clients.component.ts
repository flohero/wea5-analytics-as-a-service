import {Component, OnInit} from '@angular/core';
import {Client} from "../../model/client";
import {ClientService} from "../../services/client.service";
import {map} from "rxjs";
import {ClipboardService} from "../../services/clipboard.service";
import {HideableClient} from "../../model/hideable-client";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Array<HideableClient> = []
  newClient: HideableClient = {
    id: 0,
    appKey: '',
    hidden: true
  };

  constructor(private clientService: ClientService, private clipboardService: ClipboardService) {
  }

  private static mapClientToHideAbleClient(client: Client): HideableClient {
    const hideableClient = client as HideableClient
    hideableClient.hidden = true
    return hideableClient
  }

  ngOnInit(): void {
    this.loadClients()
  }

  showAppKey(entry: HideableClient) {
    entry.hidden = false
  }

  hideAppKey(entry: HideableClient) {
    entry.hidden = true
  }

  copyAppKey(entry: HideableClient) {
    this.clipboardService.writeText(entry.appKey)
      .subscribe()
  }

  createClient() {
    this.clientService.createClient()
      .pipe(map(client => client as HideableClient))
      .subscribe(client => {
        this.newClient = client
        this.newClient.hidden = true
        const modal = document.getElementById('client-modal')
        modal?.classList.remove('hidden')
      })
  }

  private loadClients() {
    this.clientService.findAll()
      .pipe(map(clients => {
        return clients.map(client => ClientsComponent.mapClientToHideAbleClient(client))
      }))
      .subscribe(clients => this.clients = clients)
  }
}
