'use client'
import { motion } from 'framer-motion'

interface ExperienceSectionProps {
  playSound: (soundType: string) => void;
}

export default function ExperienceSection({ playSound }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 px-4 section-transition relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-6xl font-bold text-center mb-16 hero-text"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onMouseEnter={() => playSound('hover')}
        >
          🚀 Journey
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Thales Experience */}
          <motion.div 
            className="glass-card group cursor-pointer"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={() => playSound('hover')}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">🛡️</div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Thales
                </h3>
                <p className="text-cyan-400 font-semibold">System Engineer</p>
                <p className="text-sm text-gray-400">Jul 2023 - Present</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {['💾 WIM Management', '⚡ RAID Config', '🔧 Driver Injection', '🖥️ BIOS Setup', '📊 Benchmarking'].map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-sm border border-purple-500/30">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                <p className="text-sm text-gray-300 mb-2">🎯 <strong>Mission:</strong></p>
                <p className="text-xs text-gray-400">
                  Leading IT infrastructure renewal for 64 different platforms with a 2-person team. 
                  Technical testing and benchmarking across multiple hardware configurations.
                </p>
              </div>
              
              <div className="text-xs text-gray-500">
                <span className="text-green-400">█</span> Windows Server 
                <span className="text-blue-400">█</span> SCCM 
                <span className="text-purple-400">█</span> VROC 
                <span className="text-cyan-400">█</span> PC MARK 10
              </div>
            </div>
          </motion.div>

          {/* Nike Experience */}
          <motion.div 
            className="glass-card group cursor-pointer"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={() => playSound('hover')}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">👟</div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  Nike
                </h3>
                <p className="text-pink-400 font-semibold">System Engineer</p>
                <p className="text-sm text-gray-400">Nov 2020 - Jul 2023</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {['🎫 ServiceNow', '🔧 Infrastructure', '🌐 Cisco Config', '🔐 SSO Admin', '📱 Mobile Fleet'].map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full text-sm border border-cyan-500/30">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="bg-black/20 rounded-lg p-4 border border-cyan-500/20">
                <p className="text-sm text-gray-300 mb-2">🎯 <strong>Mission:</strong></p>
                <p className="text-xs text-gray-400">
                  Managing Paris stores IT infrastructure, headquarters support, and store opening projects. 
                  3-person team supporting 300+ users across 5 retail locations.
                </p>
              </div>
              
              <div className="text-xs text-gray-500">
                <span className="text-blue-400">█</span> Active Directory 
                <span className="text-green-400">█</span> Okta 
                <span className="text-purple-400">█</span> JAMF 
                <span className="text-cyan-400">█</span> VMWare
              </div>
            </div>
          </motion.div>

          {/* Imerys Experience */}
          <motion.div 
            className="glass-card group cursor-pointer"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={() => playSound('hover')}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">⚙️</div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">
                  Imerys
                </h3>
                <p className="text-cyan-400 font-semibold">Infrastructure Consultant</p>
                <p className="text-sm text-gray-400">Dec 2019 - Feb 2020</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {['🖥️ 250 Servers', '🔒 PowerShell', '🛡️ Security Patches', '📊 KPIs', '🤖 Automation'].map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-purple-500/20 rounded-full text-sm border border-green-500/30">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="bg-black/20 rounded-lg p-4 border border-green-500/20">
                <p className="text-sm text-gray-300 mb-2">🎯 <strong>Mission:</strong></p>
                <p className="text-xs text-gray-400">
                  Security patch monitoring and planning via BMC Client. 
                  Infrastructure supervision with a 3-person team across enterprise systems.
                </p>
              </div>
              
              <div className="text-xs text-gray-500">
                <span className="text-blue-400">█</span> Windows Server 
                <span className="text-green-400">█</span> PowerShell 
                <span className="text-purple-400">█</span> BMC Client 
                <span className="text-cyan-400">█</span> GSuit
              </div>
            </div>
          </motion.div>
          {/* Education Experience */}
          <motion.div 
            className="glass-card group cursor-pointer"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={() => playSound('hover')}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">🎓</div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  EPITECH
                </h3>
                <p className="text-green-400 font-semibold">Master IT Expert</p>
                <p className="text-sm text-gray-400">Graduated July 2021</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {['💻 Software Engineering', '🔬 Innovation', '🚀 Entrepreneurship', '🌍 International', '🤝 Team Projects'].map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full text-sm border border-pink-500/30">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="bg-black/20 rounded-lg p-4 border border-pink-500/20">
                <p className="text-sm text-gray-300 mb-2">🎯 <strong>Expertise:</strong></p>
                <p className="text-xs text-gray-400">
                  Master&apos;s degree in Information Technology with focus on innovation, entrepreneurship, 
                  and cutting-edge technical skills development through project-based learning.
                </p>
              </div>
              
              <div className="text-xs text-gray-500">
                <span className="text-purple-400">█</span> C/C++ 
                <span className="text-blue-400">█</span> JavaScript 
                <span className="text-green-400">█</span> Python 
                <span className="text-cyan-400">█</span> DevOps
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}