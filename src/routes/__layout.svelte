<script>
	import '../app.postcss';
    import { page } from '$app/stores';

    import Toggle from '../components/Toggle.svelte';
    import { Tabs, TabList, TabPanel, Tab } from '../js/components/tabs.js';


</script>
<div class="text-center flex min-h-screen">

    <nav
		class="
min-h-screen
bg-gray-50 bg-opacity-75
w-64
p-8
pt-20
text-left
absolute
left-0
transform
-translate-x-full
transition-transform
duration-200
ease-in-out
md:relative md:translate-x-0
transition-colors
"
	>
		<a 
        class:active="{$page.path === '/'}"
        href="/">
			<svg
				class="w-6 h-6 inline mr-2"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m12 8v4l3 3m6-3a9 9 0 11-18 0a9 9 0 0118 0z"
				/>
			</svg>
			Clock</a
		>
        <a 
        class:active="{$page.path === '/worldclock'}"

        href="/worldclock">
			<svg
				class="w-6 h-6 inline mr-2"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 30"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m12 8v4l3 3m6-3a9 9 0 11-18 0a9 9 0 0118 0m2 11-2-2a1 1 0 01-18-18l-2-2m11 24v4h3h-7"
				/>
			</svg>
			Worldclock</a
		>
		<a>
			<svg
				class="w-6 h-6 inline mr-2"
				fill="none"
				stroke="currentColor"
				viewBox="0 -2 22 26"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m12 8v4m9 0a9 9 0 11-18 0a9 9 0 0118 0m-9-9v-4h4h-8"
				/>
			</svg>
			Stopwatch</a
		>
		<a>
			<svg
				class="w-6 h-6 inline mr-2"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m12 8v4l3 3m6-3a9 9 0 11-18 0a9 9 0 0118 0m-19-8 3-3m14 0 3 3"
				/>
			</svg>
			Timers</a
		>
		<a class="modal-btn" href="#settings-modal">
			<svg
				class="w-6 h-6 inline mr-2"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
			Settings</a
		>
		<a class="modal-btn" href="#about-modal">
			<svg
				class="w-6 h-6 inline mr-2"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			About</a
		>
	</nav>


    <slot />


    <!-- Modals -->

	<div id="settings-modal" class="modal">
		<div class="modal-content">
			<div class="modal-header">
				<button class="close icon-btn">
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="square"
							stroke-linejoin="square"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<h1>
					<svg
						class="w-6 h-6 inline mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					Settings
				</h1>
			</div>
			<div class="modal-body">


                <Tabs>
                    <TabList>
                        <Tab>Appearance</Tab>
                        <Tab>User</Tab>
                        <Tab>Application</Tab>
                        <Tab>Help</Tab>
                    </TabList>
                
                    <!-- Appearance -->
                    <TabPanel>
                        <details open>
                            <summary>General</summary>
                            <div class="details-content">
                                <span id="theme-btns" class="block mb-2" />
                                <div class="block mb-2">
                                    <button class="dark-btn icon-btn">
                                        <svg
                                            class="w-6 h-6 md:w-8 md:h-8"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke-linecap="square"
                                                stroke-linejoin="square"
                                                stroke-width="2"
                                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                            />
                                        </svg>
                                    </button>
    
                                    <button class="fullscreen-btn icon-btn">
                                        <svg
                                            class="w-6 h-6 md:w-8 md:h-8"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke-linecap="square"
                                                stroke-linejoin="square"
                                                stroke-width="2"
                                                d="m4 8v-4m0 0h4m-4 0m16 4v-4m0 0h-4m4 0m-16 12v4m0 0h4m-4 0m16 0m0 0v-4m0 4h-4"
                                            />
                                        </svg>
                                    </button>
                                </div>
    
                                <Toggle id="show-fullscreen-btn-toggle" checked={true} labelText="Show fullscreen button"></Toggle>
    
                                <br />
    
                                <Toggle id="show-dark-btn-toggle" checked={true} labelText="Show dark button"></Toggle>
    
                                <br />
    
                                <Toggle id="show-theme-btn-toggle" checked={false} labelText="Show theme buttons"></Toggle>
    
                            </div>
                        </details>
                        <details>
                            <summary>Displays</summary>
                            <div class="details-content">
                                <div class="block mb-2">
                                    <label for="primary-display-select">Primary Display:</label>
                                    <select id="primary-display-select">
                                        <option>Analog Clock</option>
                                        <option>Digital Time</option>
                                        <option>Date</option>
                                        <option>Date + Digital Time</option>
                                    </select>
                                </div>
    
                                <div class="block mb-2">
                                    <label for="secondary-display-select">Secondary Display:</label>
                                    <select id="secondary-display-select">
                                        <option>Digital Time</option>
                                        <option>Date</option>
                                        <option>Date + Digital Time</option>
                                        <option>None</option>
                                    </select>
                                </div>
    
                                <div class="block mb-2">
                                    <Toggle id="show-battery-toggle" checked={false} labelText="Show battery"></Toggle>
                                </div>
                            </div>
                        </details>
                        <details>
                            <summary>Analog</summary>
                            <div class="details-content">
                                <h3>Face</h3>
    
                                <div class="block mb-2">
                                    <label for="face-fill-select">Face Fill Color:</label>
                                    <select id="face-fill-select">
                                        <option>50</option>
                                        <option>100</option>
                                        <option>200</option>
                                        <option>300</option>
                                        <option>400</option>
                                        <option>500</option>
                                        <option>600</option>
                                        <option>700</option>
                                        <option>800</option>
                                        <option>900</option>
                                        <option>None</option>
                                    </select>
                                </div>
                                <div class="block mb-2">
                                    <label for="face-stroke-select">Face Stroke Color:</label>
                                    <select id="face-stroke-select">
                                        <option>50</option>
                                        <option>100</option>
                                        <option>200</option>
                                        <option>300</option>
                                        <option>400</option>
                                        <option>500</option>
                                        <option>600</option>
                                        <option>700</option>
                                        <option>800</option>
                                        <option>900</option>
                                        <option>None</option>
                                    </select>
                                </div>
                                <div class="block mb-2">
                                    <label for="face-stroke-width-select">Face Stroke Width:</label>
                                    <select id="face-stroke-width-select">
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </select>
                                </div>
                                <div class="block mb-2">
                                    <label for="face-shape-select">Face Shape:</label>
                                    <select id="face-shape-select">
                                        <option>Circle</option>
                                        <option>Rounded Square</option>
                                        <option>Square</option>
                                    </select>
                                </div>
    
                                <h3>Shadow</h3>
                                <div class="block mb-2">
                                    <label for="shadow-fill-select">Shadow Color:</label>
                                    <select id="shadow-fill-select">
                                        <option>50</option>
                                        <option>100</option>
                                        <option>200</option>
                                        <option>300</option>
                                        <option>400</option>
                                        <option>500</option>
                                        <option>600</option>
                                        <option>700</option>
                                        <option>800</option>
                                        <option>900</option>
                                        <option>None</option>
                                    </select>
                                </div>
    
                                <h3>Pin</h3>
    
                                <div class="block mb-2">
                                    <label for="pin-fill-select">Pin Fill Color:</label>
                                    <select id="pin-fill-select">
                                        <option>50</option>
                                        <option>100</option>
                                        <option>200</option>
                                        <option>300</option>
                                        <option>400</option>
                                        <option>500</option>
                                        <option>600</option>
                                        <option>700</option>
                                        <option>800</option>
                                        <option>900</option>
                                        <option>None</option>
                                    </select>
                                </div>
                                <div class="block mb-2">
                                    <label for="pin-stroke-select">Pin Stroke Color:</label>
                                    <select id="pin-stroke-select">
                                        <option>50</option>
                                        <option>100</option>
                                        <option>200</option>
                                        <option>300</option>
                                        <option>400</option>
                                        <option>500</option>
                                        <option>600</option>
                                        <option>700</option>
                                        <option>800</option>
                                        <option>900</option>
                                        <option>None</option>
                                    </select>
                                </div>
                                <div class="block mb-2">
                                    <label for="pin-stroke-width-select">Pin Stroke Width:</label>
                                    <select id="pin-stroke-width-select">
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                    </select>
                                </div>
                                <div class="block mb-2">
                                    <label for="pin-size-select">Pin Size:</label>
                                    <select id="pin-size-select">
                                        <option>0</option>
                                        <option>0.5</option>
                                        <option>1</option>
                                        <option>1.5</option>
                                        <option>2</option>
                                        <option>2.5</option>
                                        <option>3</option>
                                    </select>
                                </div>
    
                                <p>Coming soon: Ticks, Hands</p>
                                <!-- TODO: dynamically create options via js, save to browser -->
                            </div>
                        </details>
                        <details>
                            <summary>Digital Datetime</summary>
                            <div class="details-content">
                                <div class="block mb-2">
                                    <div class="block mb-2">
                                        <label for="time-format-select">Time Format:</label>
                                        <select id="time-format-select">
                                            <option>HH:MM</option>
                                            <option>HH:MM:SS</option>
                                            <option>HH:MM:SS.SS</option>
                                            <option>HH:MM AM/PM</option>
                                            <option>HH:MM:SS AM/PM</option>
                                            <option>HH:MM:SS.SS AM/PM</option>
                                            <option>MM:SS</option>
                                        </select>
                                    </div>
    
                                    <div class="block mb-2">
                                        <label for="date-format-select">Date Format:</label>
                                        <select id="date-format-select">
                                            <option>DD/MM</option>
                                            <option>DD/MM/YY</option>
                                            <option>DD/MM/YYYY</option>
                                            <option>Wkdy DD/MM</option>
                                            <option>Wkdy DD/MM/YY</option>
                                            <option>Wkdy DD/MM/YYYY</option>
                                            <option>Weekday DD/MM</option>
                                            <option>Weekday DD/MM/YY</option>
                                            <option>Weekday DD/MM/YYYY</option>
                                            <option>Month DD</option>
                                            <option>Month DD YY</option>
                                            <option>Month DD YYYY</option>
                                            <option>Weekday Month DD</option>
                                            <option>Weekday Month DD YY</option>
                                            <option> Weekday Month DD YYYY </option>
                                        </select>
                                    </div>
    
                                    <div class="block mb-2">
                                        <label for="datetime-format-select">Datetime Format:</label>
                                        <select id="datetime-format-select">
                                            <option>HH:MM DD/MM</option>
                                            <option>HH:MM:SS DD/MM</option>
                                            <option>HH:MM DD/MM/YY</option>
                                            <option>HH:MM:SS DD/MM/YY</option>
                                        </select>
                                    </div>
    
                                    <div class="block mb-2">
                                        <label for="locale-select">Locale:</label>
                                        <select disabled id="locale-select">
                                            <option> EN-US Los Angeles, CA, USA </option>
                                        </select>
                                    </div>
                                    <Toggle id="auto-locale-toggle" checked={true} labelText="Automatically Detect Locale"></Toggle>
                                </div>
                            </div>
                        </details>
                    </TabPanel>
                
                    <!-- User -->
                    <TabPanel>
                        <h3>Shortcuts</h3>
                        <div class="block mb-2">
                            <Toggle id="dbl-click-fullscreen-toggle" checked={true} labelText="Doubleclick Fullscreen"></Toggle>
                        </div>
                        <div class="block mb-2">
                            <Toggle id="keyboard-shortcuts-toggle" checked={true} labelText="Keyboard Shortcuts"></Toggle>
                        </div>
                        <button class="btn">View Keyboard Shortcuts</button>
                        <button class="btn">Reset Keyboard Shortcuts</button>
                    </TabPanel>
                
                    <!-- Application -->
                    <TabPanel>
                        <h3>Locale</h3>
                        <div class="block mb-2">
                            <label for="language-select">Language:</label>
                            <select id="language-select">
                                <option value="en-us">English, US</option>
                                <option value="en-gb">English, GB</option>
                                <option value="es-mx">Spanish, MX</option>
                                <option value="es-sp">Spanish, SP</option>
                            </select>
                        </div>
                        <div class="block mb-2">
                            <label for="datetime-locale-select">Datetime Locale:</label>
                            <select id="datetime-locale-select">
                                <option>en</option>
                                <option>es</option>
                                <option>de-DE</option>
                                <option>ar-EG</option>
                            </select>
                        </div>
                        <!-- todo: autocomplete type timezones -->
                        <div class="block mb-2">
                            <label for="timezone-select">Timezone:</label>
                            <select id="timezone-select">
                                <option> Pacific Daylight Time (GMT-7) Los Angeles, CA </option>
                            </select>
                        </div>
    
                        <h3>Settings</h3>
                        <div class="block mb-2">
                            <Toggle id="save-settings-toggle" checked={true} labelText="Save Settings Automatically"></Toggle>
                        </div>
                        <button class="btn">Reset Settings</button>
                        <button class="btn">Download Settings</button>
                        <button class="btn">Upload Settings</button>
    
                        <h3>App</h3>
                        <div class="block mb-2">
                            <Toggle id="always-on-top-toggle" checked={true} labelText="Always On Top"></Toggle>
                        </div>
                        <button class="btn">Open Another Clock</button>
                        <button class="btn">Share</button>
                        <button class="btn">Send Feedback</button>
                        <button class="btn">Install</button>
    
                        <h3>Advanced</h3>
                        <button class="btn">Multiple Clock Settings</button>
                        <button class="btn">Quick Resize Settings</button>
    
                        <p>V. 0.0.0</p>
                    </TabPanel>

                    <!-- Help -->
                    <TabPanel>
                        <p>Coming soon. . .</p>

                    </TabPanel>
                </Tabs>
			</div>
		</div>
	</div>
	<div id="about-modal" class="modal">
		<div class="modal-content">
			<div class="modal-header">
				<button class="close icon-btn">
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="square"
							stroke-linejoin="square"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<h1>
					<svg
						class="w-6 h-6 inline mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					About
				</h1>
			</div>
			<div class="modal-body">
				<h3>About</h3>
				<p>
					Desktop Clock is a simple, resizable and customizable clock for any device. Features
					include customizable analog and digital displays, night mode, and more. Desktop Clock is
					designed to scale perfectly to any screen size and ratio, with no distortion or
					pixelation. Use Desktop Clock as a clock on your TV, a night clock, or even project the
					time for exams. Customize the time, date and more to your liking.
				</p>

				<h3>Contact</h3>
				<p>
					Made by
					<a href="https://justingolden.me" target="_blank">Justin Golden</a>. Feel free to contact
					me with any feedback, questions, or requests at
					<a href="mailto:contact@justingolden.me" target="_blank">contact@justingolden.me</a>.
				</p>
			</div>
		</div>
	</div>
</div>
