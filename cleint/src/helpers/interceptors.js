import axios from 'axios';
import { ajax } from 'rxjs/ajax'

const setInterceptors = token => {
  token
   ? ajax.defaults.headers.common['Authorization'] = token
   : delete ajax.defaults.headers.common['Authorization']
}

export default setInterceptors;