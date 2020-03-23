<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Register Form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form
                            ref="form"
                            v-model="register.valid"
                            lazy-validation
                        >
                            <v-alert type="error">
                                I'm an error alert.
                            </v-alert>
                            <v-text-field
                                prepend-icon="person"
                                name="name"
                                label="Name"
                                type="text"
                                v-model="register.name"
                                :rules="nameRules"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                prepend-icon="person"
                                name="email"
                                label="Email"
                                type="email"
                                v-model="register.email"
                                :rules="emailRules"
                                required
                            >
                            </v-text-field>
                            <v-text-field
                                prepend-icon="lock"
                                name="password"
                                label="Password"
                                type="password"
                                required
                                v-model="register.password"
                                :rules="passwordRules"
                            >
                            </v-text-field>
                            <v-text-field
                                prepend-icon="lock"
                                name="password_confirmation"
                                label="Password Confirmation"
                                type="password"
                                required
                                v-model="register.password_confirmation"
                                :rules="password_confirmationRules"
                            >
                            </v-text-field>
                            <v-menu
                                v-model="menu_start"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="register.education_start_date"
                                        label="Education start date"
                                        prepend-icon="event"
                                        readonly
                                        v-on="on"
                                        :rules="date_startRules"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="register.education_start_date"
                                    @input="menu_start = false"
                                >
                                </v-date-picker>
                            </v-menu>
                            <v-menu
                                v-model="menu_end"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                        v-model="register.education_end_date"
                                        label="Education end date"
                                        prepend-icon="event"
                                        readonly
                                        v-on="on"
                                        :rules="date_endRules"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="register.education_end_date"
                                    @input="menu_end = false"
                                >
                                </v-date-picker>
                            </v-menu>
                            <v-text-field
                                prepend-icon="list"
                                name="terms"
                                label="Terms"
                                type="text"
                                v-model="register.terms"
                                required
                            >
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            :disabled="!register.valid"
                            @click="submit"
                            >GET STARTED</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name: 'Register',
    data() {
        return {
            menu_start: false,
            menu_end: false,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length >= 2 || 'Name must be greater than 2 characters'
            ],
            date_startRules: [v => !!v || 'Education start date is required'],
            date_endRules: [
                v => !!v || 'Education end date is required',
                v =>
                    v >= this.register.education_start_date ||
                    'The End date must be longer than the Start date.'
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v =>
                    v.length >= 6 ||
                    'Password must be greater than 6 characters'
            ],
            password_confirmationRules: [
                v => !!v || 'The Confirm Password is required.',
                v =>
                    v.length >= 6 ||
                    'Password must be greater than 6 characters',
                v =>
                    v === this.register.password ||
                    'The Confirm Password does not match'
            ],
            register: {
                valid: false,
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                terms: '',
                education_start_date: new Date().toISOString().substr(0, 10),
                education_end_date: new Date().toISOString().substr(0, 10)
            }
        };
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('userRegister', this.register);
            }
        }
    }
};
</script>

<style scoped></style>
