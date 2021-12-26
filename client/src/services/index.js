import makeAddNewsService from './addNews.service';
import makeDeleteNewsService from './deleteNews.service';
import makeGetNewsService from './getAllNews.service';
import makeArchiveNewsService from './archiveNews.service';
import makeGetAllArchivedNewsService from './getArchivedNews.service';
import makeGetNonArchivedNewsService from './getNonArchivedNews';
import apiClient from '../infrastructure';

const addNewsService = makeAddNewsService({ apiClient });
const getNewsService = makeGetNewsService({ apiClient });
const archiveNewsService = makeArchiveNewsService({ apiClient });
const deleteNewsService = makeDeleteNewsService({ apiClient });
const getArhivedNewsService = makeGetAllArchivedNewsService({ apiClient });
const getNonArhivedNewsService = makeGetNonArchivedNewsService({ apiClient });

export default Object.freeze({
  addNewsService,
  getNewsService,
  archiveNewsService,
  deleteNewsService,
  getArhivedNewsService,
  getNonArhivedNewsService,
});
