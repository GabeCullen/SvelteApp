<script>
import Switch from "./Switch.svelte";

let myValue_lights
let myValue_climate
let myValue_ac
let myValue_sound
</script>

<div class="deviceContainer">
    My devices

    <div class="row">
        <div class="device lights">
            <div class="switchAndLabel">
                {myValue_lights} <Switch bind:value={myValue_lights} label="" options={['off', 'on']} />
            </div>
            <div>Lights</div>
        </div>
        <div class="device climate">
            <div class="switchAndLabel">
                {myValue_climate} <Switch bind:value={myValue_climate} label="" options={['off', 'on']} />
            </div>
            <div>Climate</div>
        </div>
    </div>

    <div class="row">
        <div class="device ac">
            <div class="switchAndLabel">
                {myValue_ac} <Switch bind:value={myValue_ac} label="" options={['off', 'on']} />
            </div>
            <div>AC</div>
        </div>
        <div class="device sound">
            <div class="switchAndLabel">
                {myValue_sound} <Switch bind:value={myValue_sound} label="" options={['off', 'on']} />
            </div>
            <div>Sound</div>
        </div>
    </div>
    
</div>


<style>
.deviceContainer{
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #181818;
    padding: 20px;
    border-radius: 20px;
}

.device{
    background: linear-gradient(#181818, #4d4a4a, );
    border: solid 2px black;
    border-style: groove;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.switchAndLabel {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.row{
    display: flex;
    justify-content: space-around;
    gap: 10px;
}

.sound {
    background: #181818;
}
</style>