<template>
    <v-container grid-list-lg>
        <v-layout row wrap>
            <v-flex
                xs12
                sm6
                md3
                v-for="(product, index) in this.products"
                :key="index"
            >
                <v-card>
                    <v-responsive>
                        <v-img
                            v-bind:src="'https://test-api.updivision.work/api/images/' + product.picture || ''"
                            height="500px"
                        >
                        </v-img>
                    </v-responsive>
                    <v-card-text>
                        <h3 class="mb-0" style="text-align:center">{{ product.name }}</h3>
                    </v-card-text>
                    <v-card-actions row>
                        <v-card-text>$ {{ product.price }}</v-card-text>
                        <v-btn small rounded color="error" class="mr-3" @click.stop="openModal(index)">DETAILS</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog v-model="dialog" max-width="800">
            <v-card style="border: 10px solid;">
                <v-layout row>
                    <button
                        type="button"
                        class="btn-close"
                        @click="dialog=false"
                        style="position:absolute; right: 15px; top: 5px; font-size: 30px; font-weight: 900;"
                    >
                        x
                    </button>
                </v-layout>
                <v-layout row class="mt-4">
                    <v-flex sm6 md6>
                        <v-responsive>
                            <v-img class="ml-2 mb-4"
                                v-bind:src="'https://test-api.updivision.work/api/images/' + this.selectedProduct.picture || ''"
                                height="400px"
                            >
                            </v-img>
                        </v-responsive>
                    </v-flex>
                    <v-flex sm6 md6>
                        <v-card-title class="headline">
                            <h3 style="text-align:center">{{ this.selectedProduct.name || '' }}</h3>
                        </v-card-title>
                        <v-card-text>
                            <h3>${{ this.selectedProduct.price || '' }}</h3>
                            <h5 class="mt-5" style="font-weight: 500;">{{ this.selectedProduct.description || '' }}</h5>
                        </v-card-text>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios';
import store from '@/store.js';
export default {
    data() {
        return {
            products: [],
            selectedProduct: Object,
            dialog: false
        }
    },
    mounted: function() {
        axios
            .get('https://test-api.updivision.work/api/products', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': store.state.accessToken
                }
            })
            .then(jsonData => {
                this.products = jsonData.data;
            });
    },
    methods: {
        openModal(index) {
            this.selectedProduct = this.products[index];
            this.dialog = true;
        }
    }
};
</script>
