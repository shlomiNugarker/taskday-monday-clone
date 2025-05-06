<template>
  <section class="min-h-screen bg-gradient-to-br from-[#0a0a4d] via-[#1a1a6d] to-[#040539] overflow-auto font-sans relative">
    <!-- Floating background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-[#6c6cff]/10 blur-[80px]"></div>
      <div class="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#5034ff]/10 blur-[100px]"></div>
      <div class="absolute top-[40%] right-[15%] w-[200px] h-[200px] rounded-full bg-[#00c875]/10 blur-[60px]"></div>
    </div>

    <!-- Header -->
    <div class="fixed w-full backdrop-blur-md z-50 transition-all duration-300 fade-in">
      <header class="flex items-center justify-between w-[90%] max-w-[1400px] h-[70px] mx-auto py-[15px]">
        <div class="flex items-center group">
          <div class="relative text-2xl font-bold mt-[-25px] transition-transform duration-500 group-hover:scale-110">
            <div class="absolute w-[50px] h-[25px] border-2 border-[#00c875] transition-all duration-300 group-hover:border-[3px]"></div>
            <div class="absolute w-[25px] h-[50px] border-2 border-[#ffcb00] left-[40px] top-[10px] transition-all duration-300 group-hover:border-[3px]">
              <div class="absolute w-[3px] h-[3px] bg-[#00c875] left-[-2px] top-[11px] rounded-full"></div>
            </div>
            <div class="absolute w-[25px] h-[25px] left-[53px] border-2 border-[#e2435c] transition-all duration-300 group-hover:border-[3px]">
              <div class="absolute w-[3px] h-[3px] bg-[#ffcb00] left-[8px] bottom-[-2px] rounded-full"></div>
            </div>
          </div>
          <div class="relative left-[90px] top-[8px] text-[30px] font-bold tracking-[-0.5px]">
            <span class="text-[#00c875] drop-shadow-[0_0_5px_rgba(0,200,117,0.5)]">T</span>as<span class="text-[#ffcb00] drop-shadow-[0_0_5px_rgba(255,203,0,0.5)]">k</span>da<span class="text-[#e2435c] drop-shadow-[0_0_5px_rgba(226,67,92,0.5)]">y</span>
          </div>
        </div>

        <nav>
          <ul class="flex items-center">
            <li class="list-none ml-5 transition-all duration-200">
              <button class="text-white/80 px-3 py-2 bg-transparent border-none text-sm font-medium transition-all duration-200 cursor-pointer rounded-lg hover:bg-white/10 hover:text-white">Contact sales</button>
            </li>
            <li class="list-none ml-5 transition-all duration-200" @click="goLogin">
              <button class="text-white/80 px-3 py-2 bg-transparent border-none text-sm font-medium transition-all duration-200 cursor-pointer rounded-lg hover:bg-white/10 hover:text-white">Log in</button>
            </li>
            <li class="list-none ml-5 flex items-center px-4 py-2.5 bg-[#6c6cff] rounded-[25px] cursor-pointer transition-all duration-300 hover:bg-[#5a5ad5] hover:translate-y-[-2px] hover:shadow-[0_4px_20px_rgba(108,108,255,0.4)]" @click="goDemo">
              <button class="text-white bg-transparent border-none text-sm font-medium cursor-pointer">See Demo</button>
              <font-awesome-icon class="text-white ml-1.5" icon="arrow-right" />
            </li>
          </ul>
        </nav>
      </header>
    </div>

    <!-- Hero section -->
    <div class="flex justify-center items-center text-white pt-[160px] fade-in">
      <div class="flex flex-col items-center text-center">
        <div class="relative glass-box px-10 py-8 rounded-2xl shadow-xl mb-8">
          <div class="absolute top-[-60px] left-[50%] transform translate-x-[-50%] w-[120px] h-[120px] rounded-full bg-gradient-to-r from-[#6c6cff] to-[#5034ff] opacity-20 blur-[40px]"></div>
          <p class="text-[80px] font-extrabold m-0 leading-[1.1] bg-gradient-to-r from-white via-white to-[#d0d0ff] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(255,255,255,0.15)] md:text-[70px] sm:text-[50px] sm:px-5 xs:text-[40px] xxs:text-[36px]">A platform built for a</p>
          <p class="text-[80px] font-extrabold m-0 leading-[1.1] bg-gradient-to-r from-white via-white to-[#d0d0ff] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(255,255,255,0.15)] md:text-[70px] sm:text-[50px] sm:px-5 xs:text-[40px] xxs:text-[36px]">new way of working</p>
        </div>
        <span class="mt-8 text-xl opacity-90 sm:text-lg xxs:text-base px-6 max-w-[600px] fade-in" style="animation-delay:0.2s;">
          What would you like to manage with
          <span class="inline-block animate-pulse">
            <span class="text-[#00c875] drop-shadow-[0_0_5px_rgba(0,200,117,0.5)]">T</span>as<span class="text-[#ffcb00] drop-shadow-[0_0_5px_rgba(255,203,0,0.5)]">k</span>da<span class="text-[#e2435c] drop-shadow-[0_0_5px_rgba(226,67,92,0.5)]">y</span>?
          </span>
        </span>
        <div class="flex gap-4 mt-10 fade-in" style="animation-delay:0.4s;">
          <button @click="goDemo" class="group flex items-center bg-gradient-to-r from-[#6c6cff] to-[#5034ff] text-white px-8 py-5 rounded-[30px] cursor-pointer border-none text-base font-medium transition-all duration-300 shadow-[0_5px_25px_rgba(108,108,255,0.4)] hover:shadow-[0_8px_30px_rgba(108,108,255,0.6)] hover:translate-y-[-3px] active:translate-y-[1px] xxs:px-6 xxs:py-4 xxs:text-sm">
            <span class="mr-3">See Demo</span>
            <div class="w-6 h-6 flex items-center justify-center rounded-full bg-white/30 transition-all duration-300 group-hover:bg-white/40 group-hover:translate-x-1">
              <font-awesome-icon class="text-white text-sm" icon="arrow-right" />
            </div>
          </button>
          <button @click="goLogin" class="group flex items-center bg-gradient-to-r from-[#00c875] to-[#ffcb00] text-[#222] px-8 py-5 rounded-[30px] cursor-pointer border-none text-base font-semibold transition-all duration-300 shadow-[0_5px_25px_rgba(0,200,117,0.2)] hover:shadow-[0_8px_30px_rgba(255,203,0,0.3)] hover:translate-y-[-3px] active:translate-y-[1px] xxs:px-6 xxs:py-4 xxs:text-sm">
            <span class="mr-3">Get Started</span>
            <div class="w-6 h-6 flex items-center justify-center rounded-full bg-white/30 transition-all duration-300 group-hover:bg-white/40 group-hover:translate-x-1">
              <font-awesome-icon class="text-[#00c875] text-sm" icon="arrow-right" />
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Screenshot Gallery -->
    <div class="flex items-center justify-center mt-[100px] pb-20 px-[5%] gap-6 md:pb-16 sm:pb-14 sm:px-6 xs:flex-col fade-in" style="animation-delay:0.6s;">
      <div class="relative flex items-center justify-center transition-all duration-500 hover:translate-y-[-15px] hover:rotate-[-6deg] xs:my-6">
        <div class="absolute inset-0 bg-gradient-to-br from-[#00c875]/20 to-[#00c875]/5 rounded-xl blur-[15px]"></div>
        <img class="relative w-3/4 rounded-xl transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.3)] rotate-[-4deg] hover:shadow-[0_20px_50px_rgba(0,200,117,0.3)] md:w-3/4 xs:w-[90%] xs:rotate-[-2deg]" 
          src="../styles/images/1.png" 
          alt="Dashboard screenshot" />
      </div>
      <div class="relative flex items-center justify-center transition-all duration-500 hover:translate-y-[-15px] z-10 xs:my-6">
        <div class="absolute inset-0 bg-gradient-to-br from-[#6c6cff]/20 to-[#5034ff]/5 rounded-xl blur-[15px]"></div>
        <img class="relative w-[160%] rounded-xl transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(108,108,255,0.3)] md:w-[140%] xs:w-[90%]" 
          src="../styles/images/2.png" 
          alt="Task board screenshot" />
      </div>
      <div class="relative flex items-center justify-center transition-all duration-500 hover:translate-y-[-15px] hover:rotate-[6deg] xs:my-6">
        <div class="absolute inset-0 bg-gradient-to-br from-[#e2435c]/20 to-[#e2435c]/5 rounded-xl blur-[15px]"></div>
        <img class="relative w-3/4 rounded-xl transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.3)] rotate-[4deg] hover:shadow-[0_20px_50px_rgba(226,67,92,0.3)] md:w-3/4 xs:w-[90%] xs:rotate-[2deg]" 
          src="../styles/images/3.png" 
          alt="Project view screenshot" />
      </div>
    </div>

    <!-- Key Features Section -->
    <div class="max-w-[1200px] mx-auto px-8 py-24 sm:py-16 sm:px-6 fade-in" style="animation-delay:0.8s;">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-white mb-4">Perfect Solution for Your Project Management</h2>
        <p class="text-white/70 max-w-[700px] mx-auto">Taskday provides a variety of smart tools that enable teams to plan, manage, and track tasks effectively, with an innovative and intuitive user interface.</p>
      </div>

      <div class="grid grid-cols-3 gap-8 md:grid-cols-2 sm:grid-cols-1">
        <!-- Feature 1 -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(108,108,255,0.2)]">
          <div class="w-14 h-14 rounded-xl bg-gradient-to-r from-[#6c6cff] to-[#5034ff] flex items-center justify-center mb-5">
            <font-awesome-icon class="text-white text-xl" icon="tasks" />
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Interactive Kanban Boards</h3>
          <p class="text-white/70">Drag and drop tasks, arrange them by priority, and add documentation through an advanced graphical interface.</p>
        </div>

        <!-- Feature 2 -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(0,200,117,0.2)]">
          <div class="w-14 h-14 rounded-xl bg-gradient-to-r from-[#00c875] to-[#009e5c] flex items-center justify-center mb-5">
            <font-awesome-icon class="text-white text-xl" icon="chart-line" />
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Advanced Data Analysis</h3>
          <p class="text-white/70">Custom views, graphical charts, and performance analysis that enable data-driven decision making.</p>
        </div>

        <!-- Feature 3 -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(226,67,92,0.2)]">
          <div class="w-14 h-14 rounded-xl bg-gradient-to-r from-[#e2435c] to-[#b81d3c] flex items-center justify-center mb-5">
            <font-awesome-icon class="text-white text-xl" icon="users" />
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Real-time Collaboration</h3>
          <p class="text-white/70">Collaborative work on tasks, immediate updates and comments, and built-in chat for efficient team communication.</p>
        </div>

        <!-- Feature 4 -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(255,203,0,0.2)]">
          <div class="w-14 h-14 rounded-xl bg-gradient-to-r from-[#ffcb00] to-[#e2b800] flex items-center justify-center mb-5">
            <font-awesome-icon class="text-white text-xl" icon="calendar-alt" />
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Smart Schedule Management</h3>
          <p class="text-white/70">Automatic scheduling, customized alerts, and execution time tracking to achieve goals on time.</p>
        </div>

        <!-- Feature 5 -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(108,108,255,0.2)]">
          <div class="w-14 h-14 rounded-xl bg-gradient-to-r from-[#6c6cff] to-[#5034ff] flex items-center justify-center mb-5">
            <font-awesome-icon class="text-white text-xl" icon="plug" />
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Integration and Synchronization</h3>
          <p class="text-white/70">Full connection to various tools and technologies - GitHub, Slack, Google Drive, and many others.</p>
        </div>

        <!-- Feature 6 -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(0,200,117,0.2)]">
          <div class="w-14 h-14 rounded-xl bg-gradient-to-r from-[#00c875] to-[#009e5c] flex items-center justify-center mb-5">
            <font-awesome-icon class="text-white text-xl" icon="shield-alt" />
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Security and Automatic Backup</h3>
          <p class="text-white/70">Advanced protection for personal and business data, flexible permissions system, and regular cloud backup.</p>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="max-w-[1200px] mx-auto px-8 py-20 sm:py-16 sm:px-6 fade-in" style="animation-delay:1s;">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-white mb-4">Trusted by Teams Worldwide</h2>
        <p class="text-white/70 max-w-[700px] mx-auto">See how Taskday has transformed workflow management for teams of all sizes across various industries.</p>
      </div>

      <div class="grid grid-cols-3 gap-10 md:grid-cols-2 sm:grid-cols-1">
        <!-- Testimonial 1 -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-[#6c6cff]/30">
          <div class="flex items-center mb-6">
            <div class="w-16 h-16 rounded-full bg-gradient-to-r from-[#6c6cff] to-[#5034ff] flex items-center justify-center mr-4 overflow-hidden">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Client photo" class="w-full h-full object-cover" />
            </div>
            <div>
              <h4 class="text-lg font-bold text-white">David Cohen</h4>
              <p class="text-white/60 text-sm">CTO, TechNova Solutions</p>
            </div>
          </div>
          <p class="text-white/80 italic">"Taskday has revolutionized our development workflow. The intuitive interface and powerful customization options have increased our team's productivity by 40% in just three months."</p>
          <div class="flex mt-4">
            <font-awesome-icon class="text-[#ffcb00] mr-1" icon="star" />
            <font-awesome-icon class="text-[#ffcb00] mr-1" icon="star" />
            <font-awesome-icon class="text-[#ffcb00] mr-1" icon="star" />
            <font-awesome-icon class="text-[#ffcb00] mr-1" icon="star" />
            <font-awesome-icon class="text-[#ffcb00]" icon="star" />
          </div>
        </div>

        <!-- Testimonial 2 -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-[#00c875]/30">
          <div class="flex items-center mb-6">
            <div class="w-16 h-16 rounded-full bg-gradient-to-r from-[#00c875] to-[#009e5c] flex items-center justify-center mr-4 overflow-hidden">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Client photo" class="w-full h-full object-cover" />
            </div>
            <div>
              <h4 class="text-lg font-bold text-white">Sarah Johnson</h4>
              <p class="text-white/60 text-sm">Project Manager, CreativeWorks</p>
            </div>
          </div>
          <p class="text-white/80 italic">"The analytics dashboard gives me instant visibility into project progress. Taskday has become an essential tool for our creative team, helping us deliver client projects on time and within budget."</p>
          <div class="flex mt-4">
            <font-awesome-icon class="text-[#ffcb00] mr-1" icon="star" />
            <font-awesome-icon class="text-[#ffcb00] mr-1" icon="star" />
            <font-awesome-icon class="text-[#ffcb00] mr-1" icon="star" />
            <font-awesome-icon class="text-[#ffcb00] mr-1" icon="star" />
            <font-awesome-icon class="text-[#ffcb00]/50" icon="star" />
          </div>
        </div>

        <!-- Testimonial 3 -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:border-[#e2435c]/30">
          <div class="flex items-center mb-6">
            <div class="w-16 h-16 rounded-full bg-gradient-to-r from-[#e2435c] to-[#b81d3c] flex items-center justify-center mr-4 overflow-hidden">
              <img src="https://randomuser.me/api/portraits/men/62.jpg" alt="Client photo" class="w-full h-full object-cover" />
            </div>
            <div>
              <h4 class="text-lg font-bold text-white">Michael Rodriguez</h4>
              <p class="text-white/60 text-sm">Founder, StartupLaunch</p>
            </div>
          </div>
          <p class="text-white/80 italic">"As a startup founder, I needed a solution that would scale with our growth. Taskday's flexibility and powerful collaboration features have made it the backbone of our operations."</p>
          <div class="flex mt-4">
            <font-awesome-icon class="text-[#ffcb00] mr-1" icon="star" />
            <font-awesome-icon class="text-[#ffcb00] mr-1" icon="star" />
            <font-awesome-icon class="text-[#ffcb00] mr-1" icon="star" />
            <font-awesome-icon class="text-[#ffcb00] mr-1" icon="star" />
            <font-awesome-icon class="text-[#ffcb00] mr-1" icon="star" />
          </div>
        </div>
      </div>
    </div>

    <!-- Tech Stack Section -->
    <div class="max-w-[1200px] mx-auto px-8 py-20 sm:py-16 sm:px-6 fade-in bg-white/5 rounded-3xl my-8" style="animation-delay:1.2s;">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-white mb-4">Built with Modern Technology</h2>
        <p class="text-white/70 max-w-[700px] mx-auto">Taskday is powered by a robust stack of cutting-edge technologies to provide a seamless and high-performance experience.</p>
      </div>

      <div class="grid grid-cols-4 gap-8 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        <!-- Tech 1 -->
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/15">
          <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <font-awesome-icon class="text-[#42b883] text-4xl" icon="fab fa-vuejs" />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Vue.js</h3>
          <p class="text-white/70 text-sm">Progressive JavaScript framework for building dynamic user interfaces</p>
        </div>

        <!-- Tech 2 -->
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/15">
          <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <font-awesome-icon class="text-[#38bdf8] text-4xl" icon="fab fa-css3-alt" />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Tailwind CSS</h3>
          <p class="text-white/70 text-sm">Utility-first CSS framework for rapid UI development</p>
        </div>

        <!-- Tech 3 -->
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/15">
          <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <font-awesome-icon class="text-[#f7df1e] text-4xl" icon="fab fa-js" />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">JavaScript</h3>
          <p class="text-white/70 text-sm">Core programming language for interactive features</p>
        </div>

        <!-- Tech 4 -->
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/15">
          <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <font-awesome-icon class="text-[#68a063] text-4xl" icon="fab fa-node-js" />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Node.js</h3>
          <p class="text-white/70 text-sm">Server-side JavaScript runtime for backend operations</p>
        </div>

        <!-- Tech 5 -->
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/15">
          <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <font-awesome-icon class="text-[#4479a1] text-4xl" icon="fas fa-database" />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">MongoDB</h3>
          <p class="text-white/70 text-sm">NoSQL database for flexible data storage and retrieval</p>
        </div>

        <!-- Tech 6 -->
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/15">
          <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <font-awesome-icon class="text-[#dd1b16] text-4xl" icon="fab fa-git-alt" />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Git</h3>
          <p class="text-white/70 text-sm">Version control system for efficient code management</p>
        </div>

        <!-- Tech 7 -->
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/15">
          <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <font-awesome-icon class="text-[#2496ed] text-4xl" icon="fab fa-docker" />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">Docker</h3>
          <p class="text-white/70 text-sm">Containerization platform for consistent deployment</p>
        </div>

        <!-- Tech 8 -->
        <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/15">
          <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <font-awesome-icon class="text-[#cb3837] text-4xl" icon="fab fa-npm" />
          </div>
          <h3 class="text-lg font-bold text-white mb-2">npm</h3>
          <p class="text-white/70 text-sm">Package manager for JavaScript dependencies</p>
        </div>
      </div>
    </div>

    <!-- Project Showcase Section -->
    <div class="max-w-[1200px] mx-auto px-8 py-20 sm:py-16 sm:px-6 fade-in" style="animation-delay:1.4s;">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-white mb-4">Project Showcase</h2>
        <p class="text-white/70 max-w-[700px] mx-auto">See how different teams use Taskday to organize their workflows and deliver successful projects.</p>
      </div>

      <div class="grid grid-cols-2 gap-10 md:grid-cols-1">
        <!-- Project Case Study 1 -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(108,108,255,0.2)]">
          <div class="relative h-[250px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Software development team" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a4d]/90 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6">
              <span class="bg-[#6c6cff] text-white text-xs py-1 px-3 rounded-full">SOFTWARE DEVELOPMENT</span>
              <h3 class="text-2xl font-bold text-white mt-2">AgileTeam Software</h3>
            </div>
          </div>
          <div class="p-6">
            <p class="text-white/80 mb-4">A team of 25 developers using Taskday to manage complex software development cycles, from sprint planning to release management.</p>
            <div class="flex items-center text-white/60 text-sm">
              <div class="flex items-center mr-4">
                <font-awesome-icon class="mr-2" icon="calendar-alt" />
                <span>6-week cycles</span>
              </div>
              <div class="flex items-center">
                <font-awesome-icon class="mr-2" icon="code-branch" />
                <span>15+ active projects</span>
              </div>
            </div>
            <div class="mt-6 flex">
              <a href="#" class="flex items-center text-[#6c6cff] hover:text-[#5034ff] transition">
                <span class="mr-2">View case study</span>
                <font-awesome-icon icon="arrow-right" />
              </a>
            </div>
          </div>
        </div>

        <!-- Project Case Study 2 -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(0,200,117,0.2)]">
          <div class="relative h-[250px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Marketing team" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a4d]/90 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6">
              <span class="bg-[#00c875] text-white text-xs py-1 px-3 rounded-full">MARKETING</span>
              <h3 class="text-2xl font-bold text-white mt-2">GlobalMarketing Co.</h3>
            </div>
          </div>
          <div class="p-6">
            <p class="text-white/80 mb-4">A marketing agency with 50+ clients using Taskday to coordinate campaigns across digital and traditional channels.</p>
            <div class="flex items-center text-white/60 text-sm">
              <div class="flex items-center mr-4">
                <font-awesome-icon class="mr-2" icon="users" />
                <span>18 team members</span>
              </div>
              <div class="flex items-center">
                <font-awesome-icon class="mr-2" icon="chart-line" />
                <span>32% increase in efficiency</span>
              </div>
            </div>
            <div class="mt-6 flex">
              <a href="#" class="flex items-center text-[#00c875] hover:text-[#009e5c] transition">
                <span class="mr-2">View case study</span>
                <font-awesome-icon icon="arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-14 text-center">
        <button @click="goDemo" class="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/30">
          <span class="mr-2">Explore more case studies</span>
          <font-awesome-icon icon="arrow-right" />
        </button>
      </div>
    </div>

    <!-- Developer Experience Section -->
    <div class="max-w-[1200px] mx-auto px-8 py-20 sm:py-16 sm:px-6 fade-in" style="animation-delay:1.6s;">
      <div class="flex flex-col md:flex-col-reverse">
        <div class="w-full bg-white/10 backdrop-blur-md rounded-2xl p-10 relative overflow-hidden">
          <div class="absolute top-[-80px] right-[-80px] w-[200px] h-[200px] rounded-full bg-[#6c6cff]/20 blur-[60px]"></div>
          
          <div class="grid grid-cols-2 gap-10 md:grid-cols-1">
            <div>
              <h2 class="text-4xl font-bold text-white mb-6">Why Developers Love Taskday</h2>
              <p class="text-white/80 mb-6">Built by developers for developers, Taskday provides a seamless experience for managing complex software projects. Our platform integrates with your favorite tools while providing powerful workflows that adapt to your team's needs.</p>
              
              <ul class="space-y-4">
                <li class="flex items-start">
                  <div class="w-6 h-6 rounded-full bg-[#00c875] flex items-center justify-center mt-1 mr-3">
                    <font-awesome-icon class="text-white text-xs" icon="check" />
                  </div>
                  <div>
                    <h4 class="text-white font-semibold">GitHub Integration</h4>
                    <p class="text-white/70 text-sm">Seamlessly connect tasks with code repositories, pull requests, and commits.</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="w-6 h-6 rounded-full bg-[#00c875] flex items-center justify-center mt-1 mr-3">
                    <font-awesome-icon class="text-white text-xs" icon="check" />
                  </div>
                  <div>
                    <h4 class="text-white font-semibold">CI/CD Pipeline Tracking</h4>
                    <p class="text-white/70 text-sm">Monitor build statuses and deployment pipelines directly in your workflow.</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="w-6 h-6 rounded-full bg-[#00c875] flex items-center justify-center mt-1 mr-3">
                    <font-awesome-icon class="text-white text-xs" icon="check" />
                  </div>
                  <div>
                    <h4 class="text-white font-semibold">Custom Development Metrics</h4>
                    <p class="text-white/70 text-sm">Track velocity, code quality, and other key performance indicators.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="relative mt-4">
              <div class="absolute inset-0 bg-gradient-to-br from-[#6c6cff]/20 to-[#5034ff]/5 rounded-xl blur-[15px]"></div>
              <div class="relative bg-[#0a0a4d]/40 border border-white/10 rounded-xl h-full p-6 overflow-hidden shadow-lg">
                <pre class="text-white/90 font-mono text-xs leading-relaxed">
<span class="text-[#e2435c]">import</span> <span class="text-[#ffcb00]">{ createProject }</span> <span class="text-[#e2435c]">from</span> <span class="text-[#00c875]">'taskday-sdk'</span>;

<span class="text-[#6c6cff]">// Initialize a new project with sprints</span>
<span class="text-[#e2435c]">const</span> <span class="text-white">project</span> = <span class="text-[#ffcb00]">await</span> <span class="text-[#00c875]">createProject</span>({
  <span class="text-[#ffcb00]">name</span>: <span class="text-[#00c875]">'E-commerce Platform'</span>,
  <span class="text-[#ffcb00]">template</span>: <span class="text-[#00c875]">'agile'</span>,
  <span class="text-[#ffcb00]">sprints</span>: {
    <span class="text-[#ffcb00]">duration</span>: <span class="text-[#e2435c]">14</span>, <span class="text-[#6c6cff]">// days</span>
    <span class="text-[#ffcb00]">count</span>: <span class="text-[#e2435c]">6</span>
  },
  <span class="text-[#ffcb00]">integrations</span>: [
    { <span class="text-[#ffcb00]">type</span>: <span class="text-[#00c875]">'github'</span>, <span class="text-[#ffcb00]">repo</span>: <span class="text-[#00c875]">'company/ecommerce'</span> },
    { <span class="text-[#ffcb00]">type</span>: <span class="text-[#00c875]">'slack'</span>, <span class="text-[#ffcb00]">channel</span>: <span class="text-[#00c875]">'#dev-ecommerce'</span> }
  ]
});

<span class="text-[#6c6cff]">// Add tasks programmatically</span>
<span class="text-[#e2435c]">const</span> <span class="text-white">task</span> = <span class="text-[#ffcb00]">await</span> <span class="text-white">project</span>.<span class="text-[#00c875]">createTask</span>({
  <span class="text-[#ffcb00]">title</span>: <span class="text-[#00c875]">'Implement payment gateway'</span>,
  <span class="text-[#ffcb00]">assignee</span>: <span class="text-[#00c875]">'developer@example.com'</span>,
  <span class="text-[#ffcb00]">priority</span>: <span class="text-[#00c875]">'high'</span>,
  <span class="text-[#ffcb00]">sprint</span>: <span class="text-[#e2435c]">1</span>
});

<span class="text-[#6c6cff]">// Setup webhook for CI events</span>
<span class="text-[#ffcb00]">await</span> <span class="text-white">project</span>.<span class="text-[#00c875]">setupWebhook</span>({
  <span class="text-[#ffcb00]">url</span>: <span class="text-[#00c875]">'https://ci.example.com/hooks/taskday'</span>,
  <span class="text-[#ffcb00]">events</span>: [<span class="text-[#00c875]">'task.updated'</span>, <span class="text-[#00c875]">'sprint.started'</span>]
});</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="max-w-[1200px] mx-auto px-8 py-20 sm:py-16 sm:px-6 fade-in" style="animation-delay:1.8s;">
      <div class="bg-gradient-to-br from-[#0a0a4d]/80 via-[#1a1a6d]/80 to-[#040539]/80 backdrop-blur-md rounded-3xl p-10 relative overflow-hidden border border-white/10">
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div class="absolute top-[10%] left-[5%] w-[200px] h-[200px] rounded-full bg-[#6c6cff]/10 blur-[80px]"></div>
          <div class="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-[#00c875]/10 blur-[90px]"></div>
        </div>
        
        <div class="grid grid-cols-2 gap-16 md:grid-cols-1 md:gap-10 relative z-10">
          <div>
            <h2 class="text-4xl font-bold text-white mb-4">Ready to transform your workflow?</h2>
            <p class="text-white/80 mb-8">Schedule a personalized demo to see how Taskday can be tailored to your specific needs.</p>
            
            <form class="space-y-4">
              <div>
                <label class="text-white/80 block mb-2 text-sm" for="name">Full Name</label>
                <input type="text" id="name" class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-[#6c6cff] text-white placeholder-white/40 transition-all" placeholder="John Smith" />
              </div>
              <div>
                <label class="text-white/80 block mb-2 text-sm" for="email">Work Email</label>
                <input type="email" id="email" class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-[#6c6cff] text-white placeholder-white/40 transition-all" placeholder="john@company.com" />
              </div>
              <div>
                <label class="text-white/80 block mb-2 text-sm" for="company">Company Name</label>
                <input type="text" id="company" class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-[#6c6cff] text-white placeholder-white/40 transition-all" placeholder="Your Company" />
              </div>
              <div>
                <label class="text-white/80 block mb-2 text-sm" for="message">What are you looking to achieve?</label>
                <textarea id="message" rows="4" class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-[#6c6cff] text-white placeholder-white/40 transition-all resize-none" placeholder="Tell us about your team and goals..."></textarea>
              </div>
              <button type="submit" class="w-full bg-gradient-to-r from-[#6c6cff] to-[#5034ff] text-white py-4 rounded-xl transition-all duration-300 hover:shadow-[0_5px_20px_rgba(108,108,255,0.4)] hover:translate-y-[-2px]">Request Demo</button>
            </form>
          </div>
          
          <div class="flex flex-col justify-center">
            <div class="mb-10">
              <h3 class="text-2xl font-bold text-white mb-4">Enterprise Solutions</h3>
              <p class="text-white/80 mb-6">For larger organizations with complex requirements, our enterprise plan offers:</p>
              
              <ul class="space-y-3">
                <li class="flex items-center">
                  <div class="w-6 h-6 rounded-full bg-[#ffcb00] flex items-center justify-center mr-3">
                    <font-awesome-icon class="text-white text-xs" icon="check" />
                  </div>
                  <span class="text-white">Custom deployment options</span>
                </li>
                <li class="flex items-center">
                  <div class="w-6 h-6 rounded-full bg-[#ffcb00] flex items-center justify-center mr-3">
                    <font-awesome-icon class="text-white text-xs" icon="check" />
                  </div>
                  <span class="text-white">Advanced security features</span>
                </li>
                <li class="flex items-center">
                  <div class="w-6 h-6 rounded-full bg-[#ffcb00] flex items-center justify-center mr-3">
                    <font-awesome-icon class="text-white text-xs" icon="check" />
                  </div>
                  <span class="text-white">Dedicated support team</span>
                </li>
                <li class="flex items-center">
                  <div class="w-6 h-6 rounded-full bg-[#ffcb00] flex items-center justify-center mr-3">
                    <font-awesome-icon class="text-white text-xs" icon="check" />
                  </div>
                  <span class="text-white">Custom integrations</span>
                </li>
              </ul>
            </div>
            
            <div class="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div class="flex items-center mb-4">
                <font-awesome-icon class="text-[#00c875] text-xl mr-3" icon="headset" />
                <h4 class="text-lg font-bold text-white">Need immediate assistance?</h4>
              </div>
              <p class="text-white/70 mb-4">Our product specialists are available to help you determine the best solution for your needs.</p>
              <a href="tel:+1234567890" class="flex items-center text-[#00c875] hover:text-[#009e5c] transition">
                <font-awesome-icon class="mr-2" icon="phone" />
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modern Footer -->
    <footer class="w-full py-6 bg-white/10 backdrop-blur-md border-t border-white/20 mt-10 fade-in" style="animation-delay:1s;">
      <div class="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
        <div class="flex items-center gap-2">
          <span class="font-bold text-[#6c6cff]">Taskday</span>
          <span class="text-xs text-white/60">© 2024 All Rights Reserved</span>
        </div>
        <div class="flex gap-4">
          <a href="#" class="text-[#6c6cff] hover:text-[#5034ff] transition" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="text-[#00c875] hover:text-[#009e5c] transition" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
          <a href="#" class="text-[#e2435c] hover:text-[#b81d3c] transition" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" class="text-[#ffcb00] hover:text-[#e2b800] transition" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      imgs: [
        '../styles/images/1.png',
        '../styles/images/2.png',
        '../styles/images/3.png',
      ],
    }
  },
  computed: {
    boardsList() {
      return this.$store.getters.boardsList
    },
  },
  created() {
    this.$store.dispatch({ type: 'getBoardsList' })
    this.loadUsers()
    this.setupIcons()
  },
  methods: {
    goDemo() {
      var boardId = this.boardsList[0].boardId
      this.$router.push(`/board/${boardId}`)
    },
    goLogin() {
      var boardId = this.boardsList[0].boardId
      this.$router.push(`/login/`)
    },
    loadUsers() {
      this.$store.dispatch({ type: 'loadUsers' })
    },
    setupIcons() {
      console.log('Setting up Font Awesome icons')
    }
  },
  components: {},
}
</script>

<style>
/* Custom breakpoints for xs and xxs screens */
@media (max-width: 650px) {
  .xs\:text-\[40px\] { font-size: 40px; }
  .xs\:flex-col { flex-direction: column; }
  .xs\:my-6 { margin-top: 1.5rem; margin-bottom: 1.5rem; }
  .xs\:w-\[90\%\] { width: 90%; }
  .xs\:rotate-\[-2deg\] { transform: rotate(-2deg); }
  .xs\:rotate-\[2deg\] { transform: rotate(2deg); }
  .xs\:px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
}

@media (max-width: 480px) {
  .xxs\:text-\[36px\] { font-size: 36px; }
  .xxs\:text-base { font-size: 1rem; }
  .xxs\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
  .xxs\:py-4 { padding-top: 1rem; padding-bottom: 1rem; }
  .xxs\:text-sm { font-size: 0.875rem; }
}

@media (max-width: 768px) {
  .sm\:text-\[50px\] { font-size: 50px; }
  .sm\:px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
  .sm\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
  .sm\:text-lg { font-size: 1.125rem; }
  .sm\:pb-14 { padding-bottom: 3.5rem; }
}

@media (max-width: 1024px) {
  .md\:text-\[70px\] { font-size: 70px; }
  .md\:w-\[140\%\] { width: 140%; }
  .md\:w-3\/4 { width: 75%; }
  .md\:pb-16 { padding-bottom: 4rem; }
}

/* Glassmorphism effect */
.glass-box {
  background: rgba(255,255,255,0.10);
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.18);
  position: relative;
  z-index: 1;
}

/* Fade-in animation */
.fade-in {
  opacity: 0;
  animation: fadeIn 1.2s ease forwards;
}

.fade-in[style*="animation-delay:0.2s"] { animation-delay: 0.2s; }
.fade-in[style*="animation-delay:0.4s"] { animation-delay: 0.4s; }
.fade-in[style*="animation-delay:0.6s"] { animation-delay: 0.6s; }
.fade-in[style*="animation-delay:0.8s"] { animation-delay: 0.8s; }
.fade-in[style*="animation-delay:1s"] { animation-delay: 1s; }

@keyframes fadeIn {
  to { opacity: 1; }
}

/* Add animation keyframes */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
</style>
