import { Controller, Get, Param } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get(':text')
  getSearchResult(@Param('text') text : string){
    return this.searchService.getSearchResult(text);
  }
}
