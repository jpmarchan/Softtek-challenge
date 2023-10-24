import PeopleResultsEs from './PeopleResultsEs.dto';

class PeopleReturnEs {
  count: number;
  next: string;
  results?: [PeopleResultsEs]
}

export default PeopleReturnEs;
