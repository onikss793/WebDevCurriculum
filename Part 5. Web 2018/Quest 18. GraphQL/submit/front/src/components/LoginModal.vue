<template>
    <div class="modal-background">
        <div id="modal" class="ui active modal">
            <i @click="cancelModal" class="close icon"></i>
            <div class="header">
                로그인
            </div>
            <div class="login-inputs">
                <input type="text" placeholder="아이디" v-model="idValue"/>
                <input
                    type="password"
                    placeholder="비밀번호"
                    v-model="pwValue"
                />
            </div>
            <div class="actions">
                <div @click="cancelModal" class="ui black deny button">
                    취소
                </div>
                <div @click="loginClicked" class="ui positive button">
                    로그인
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		name: 'LoginModal',
		computed: {
			idValue: {
				get() {
					return this.$store.state.auth.id;
				},
				set(id) {
					this.$store.commit('auth/setId', id);
				}
			},
			pwValue: {
				get() {
					return this.$store.state.auth.pw;
				},
				set(pw) {
					this.$store.commit('auth/setPw', pw);
				}
			}
		},
		methods: {
			...mapActions('auth', ['login']),
			...mapActions('note', ['loadNoteSession']),
			async loginClicked() {
				try {
					const payload = {
						id: this.$store.state.auth.id,
						pw: this.$store.state.auth.pw
					};

					await this.login(payload);

					this.$store.commit('auth/setId', '');
					this.$store.commit('auth/setPw', '');

					const response = await this.loadNoteSession();

					this.$store.commit(
						'note/setNotes',
						response.data.data.loadSessionData.notes
					);
				} catch (err) {
					console.log('Log In Error: ', err);
				}
			},
			cancelModal() {
				this.$store.commit('auth/setModal', false);
			}
		}
	};
</script>

<style>
    .modal-background {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: grey;
        opacity: 0.7;
        z-index: 20;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #modal {
        width: 600px;
        padding: 0;
    }

    .login-inputs {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;
        margin-bottom: 50px;
    }

    .login-inputs > input {
        text-indent: 30px;
        height: 70px;
        width: 60%;
        border: 1px solid rgb(169, 214, 255);
        border-radius: 10px;
    }
</style>
