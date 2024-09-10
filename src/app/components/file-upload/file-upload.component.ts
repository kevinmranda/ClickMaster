import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PrimeNGConfig, MessageService } from 'primeng/api';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  userIDstr = localStorage.getItem('id');
  userID: number = this.userIDstr ? parseInt(this.userIDstr, 10) : NaN;
  files: any[] = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;
  index!: number;
  loading = false;

  constructor(
    private config: PrimeNGConfig,
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  choose(event: Event, callback: () => void): void {
    callback();
  }

  onRemoveTemplatingFile(
    event: Event,
    file: any,
    removeFileCallback: (event: Event, index: number) => void,
    index: number
  ): void {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear: () => void): void {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onSelectedFiles(event: any): void {
    this.files = event.currentFiles;
    this.files.forEach((file) => {
      this.totalSize += parseInt(this.formatSize(file.size));
    });
    this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(): void {
    this.loading = true;
    // Process each file
    this.files.forEach((file) => {
      // Create a new FileReader instance
      const reader = new FileReader();

      // Define the onload event for the reader
      reader.onload = (event: any) => {
        const image = new Image();
        image.src = event.target.result;

        // Once the image is loaded, retrieve its dimensions
        image.onload = () => {
          const width = image.width;
          const height = image.height;

          // Create FormData to send the file
          const formData: FormData = new FormData();
          formData.append('file', file, file.name);

          // Upload the file to the server
          this.http
            .post('https://goapi-lppa.onrender.com/upload/', formData)
            .subscribe(
              (uploadResponse: any) => {
                // On successful upload, prepare file details
                const fileDetails = {
                  title: file.name.split('.').slice(0, -1).join('.'),
                  description: `${width}x${height}`, // USING the image dimensions
                  filename: `${file.name}`,
                  price: 25000,
                };

                // Save file details to the database
                this.http
                  .post(
                    'https://goapi-lppa.onrender.com/insertPhoto/' +
                      this.userID,
                    fileDetails
                  )
                  .subscribe(
                    (response) => {
                      this.loading = false;
                      this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Photo uploaded successfully',
                        life: 3000,
                      });
                    },
                    (error) => {
                      this.loading = false;
                      this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to save file details',
                        life: 3000,
                      });
                    }
                  );
              },
              (error) => {
                this.loading = false;
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'File upload failed',
                  life: 3000,
                });
              }
            );
        };
      };

      // Read the file as a Data URL to trigger the onload event
      reader.readAsDataURL(file);
    });
  }

  formatSize(bytes: number): string {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes || [
      'Bytes',
      'KB',
      'MB',
      'GB',
      'TB',
    ];

    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }
}
