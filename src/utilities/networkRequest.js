// @flow
import axios from 'axios';

export const networkRequest = ( config: Object ): Promise => {

  return axios( config )
    .then(response => { return response })
    .catch(error => console.error(error));

}