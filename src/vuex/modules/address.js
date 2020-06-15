import { allget } from '../../api/api';
import axios from 'axios';

const addressData = {
    state: {
        address:''
    },
    mutations: {
        SET_ADDRESS: (state, name) => {
            state.name = name;
        }
    },
    actions: {
        GetAddress({ commit },addressInfo){
            return new Promise((resolve, reject) => {
                var url = "/c_account/get_user_contacts";
                var parmas = {
                    'store_id': addressInfo.store_id,
                    "open_id":addressInfo.open_id,
                };
                var headerConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                };
                try {
                    axios.post( allget+url, parmas, headerConfig).then((res) => {
                        if(res.data){
                            var adderss_data = res.data;
                            commit('SET_ADDRESS',res.data);
                             config.setCookie(
                                'adderssDataList',
                                JSON.stringify(
                                    {
                                        adderss_data
                                    }
                                ),
                                7
                            );
                            resolve(res);
                        }else{
                            config.layerMsg('出错了~', 2);
                            resolve(res);
                        }
                    })
                } catch (error) {
                    
                }
            })
            .catch(e => {
                reject(e);
            })
        }
    }
}
export default addressData;