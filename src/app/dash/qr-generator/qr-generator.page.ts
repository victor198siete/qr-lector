import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.page.html',
  styleUrls: ['./qr-generator.page.scss'],
})
export class QrGeneratorPage implements OnInit {
  textToPrint?: string;
  @ViewChild('qrCode', { static: false }) qrCode?: QRCodeComponent;
  @ViewChild('qrCanvas', { static: false }) qrCanvas?: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngOnInit() {
  }

  async convertToPNG() {
    if (!this.textToPrint) {
      console.error('No hay texto para generar el código QR');
      return;
    }

    const canvas = this.qrCanvas?.nativeElement;
    const context = canvas?.getContext('2d');

    // Generar código QR en el canvas
    await QRCode.toCanvas(canvas, this.textToPrint, { width: 400 });

    // Convertir canvas a imagen PNG
    const imageData = canvas?.toDataURL('image/png');

    // Crear enlace de descarga
    const link = document.createElement('a');
    link.href = imageData!;
    link.download = 'qr_code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
