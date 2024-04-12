import { Component, ElementRef, ViewChild } from '@angular/core';
import { Barcode, BarcodeScanner, BarcodeFormat, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';
import * as QRCode from 'qrcode';

import { Directory } from '@capacitor/filesystem';
import write_blob from 'capacitor-blob-writer';
import { File } from "@ionic-native/file/ngx";
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  supported = false;
  barcodes: Barcode[] = [];
  scanning: boolean = false;
  textToPrint?: string;
  @ViewChild('qrCode', { static: false }) qrCode?: QRCodeComponent;
  @ViewChild('qrCanvas', { static: false }) qrCanvas?: ElementRef<HTMLCanvasElement>;


  lines = [
    ['Maria','Perez'],
    ['Luis','Perez']
  ]

  EXCEL_TYPE = 'aplication/vndopenxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.lines);

  constructor(
    private alertController: AlertController) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.supported = result.supported;
    });
  }

  // downloadQRCode() {
  //   const qrCodeImg = this.qrCode?.qrcElement.nativeElement.querySelector('img');
  //   if (!qrCodeImg) {
  //     console.error('No se pudo encontrar la imagen del código QR');
  //     return;
  //   }

  //   const qrCodeBase64 = qrCodeImg.src;
  //   if (!qrCodeBase64 || !qrCodeBase64.startsWith('data:image/png;base64,')) {
  //     console.error('La cadena base64 de la imagen del código QR no es válida');
  //     return;
  //   }

  //   // Convertir base64 en Blob
  //   const byteCharacters = atob(qrCodeBase64.split(',')[1]);
  //   const byteNumbers = new Array(byteCharacters.length);
  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }
  //   const byteArray = new Uint8Array(byteNumbers);
  //   const blob = new Blob([byteArray], { type: 'image/png' });

  //   // Crear enlace de descarga
  //   const link = document.createElement('a');
  //   link.href = URL.createObjectURL(blob);
  //   link.download = 'qr_code.png';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }

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

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.scanning = !this.scanning;
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
