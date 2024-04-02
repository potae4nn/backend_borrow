import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getService(id: string): Promise<AxiosResponse<any[]>> {
    return await this.httpService.axiosRef.get('https://shc.sut.ac.th/service/' + id, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNjMwMzMiLCJqdGkiOiIzMTI3Mzc4Ni04ZWVkLTRhZjQtOGIzMi1iYjg0NTRmYmU4ZjgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMjYzMDMzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlN0YWZmIiwiTWVtYmVyIl0sImV4cCI6MTY1NTI4MTQ5MSwiaXNzIjoiU01BUlQtU0hDIiwiYXVkIjoiU1RBRkYifQ.0ClLxPWQS25qSDrqXN82DI0-LUruN4loKoOf0XoNkGA',
      },
    }).then(res=>{
      return res.data
    });
  }
}
