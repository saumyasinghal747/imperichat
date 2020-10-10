<template>
	<div>
		<md-app-toolbar class="md-large md-dense md-primary" style="z-index: 10">
			<div class="md-toolbar-row">
				<div class="md-toolbar-section-start">
					<md-button class="md-icon-button d-sm-only" @click="$store.commit('toggleDrawer')">
						<md-icon>menu</md-icon>
					</md-button>
					
					<span class="md-title">Settings</span>
					<top-right-menu/>
				</div>
			
			
			</div>
			
		</md-app-toolbar>
		<md-app-content >
			<md-content style="margin: 2em;margin-top: 25%">
				<md-card>
					<md-card-header>
						<md-card-header-text>
							<md-avatar style="min-height: 96px;min-width: 96px;border-radius: 96px;font-size: 48px">
								<img :src="$store.state.user.photoURL"/>
							</md-avatar>
							<span class="md-display-1" style="margin-left: 3rem;padding-top: 60px">{{$store.state.user.displayName}}</span>
						</md-card-header-text>
						
					</md-card-header>
				</md-card>
				<md-card>
					<md-card-content>
						<md-switch  v-model="$store.state.darkMode">Dark Mode</md-switch>
						<br>
						<md-switch disabled >Notifications</md-switch>
					</md-card-content>
				</md-card>
				
			</md-content>
			
		</md-app-content>
	</div>

</template>

<script>
    import TopRightMenu from "../components/topRightMenu";
    export default {
        name: "Settings",
        components: {TopRightMenu},
	    data(){
            return {
                darkMode:false
            }
	    }
    }
</script>

<style scoped>

</style>
