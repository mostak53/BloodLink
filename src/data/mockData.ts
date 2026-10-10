import { Donor, BloodRequest, NotificationItem } from '../types';

export const BANGLADESH_LOCATIONS = [
  {
    division: 'Dhaka',
    districts: [
      {
        name: 'Dhaka',
        subAreas: [
          'Dhanmondi (Road 27 / Rangs Nasim)',
          'Mirpur 10 & 2 Circle',
          'Uttara (Sector 3, 7, 11)',
          'Gulshan 1 & 2',
          'Banani & Kamal Ataturk',
          'Mohammadpur (Ring Road / Town Hall)',
          'Badda & Pragati Sarani',
          'Rampura & Banasree',
          'Motijheel & Dilkusha',
          'Old Dhaka (Sadarghat / Lalbagh)',
          'Khilgaon & Malibagh',
          'Shahbagh & BSMMU Medical Area',
          'Farmgate & Tejgaon'
        ]
      },
      {
        name: 'Gazipur',
        subAreas: ['Chowrasta', 'Board Bazar', 'Tongi College Gate', 'Konabari', 'Joydebpur Sadar']
      },
      {
        name: 'Narayanganj',
        subAreas: ['Chashara', 'Signboard', 'Fatullah', 'Siddhirganj', 'Bandar']
      },
      {
        name: 'Tangail',
        subAreas: ['Tangail Sadar', 'Mirzapur', 'Gopalpur', 'Madhupur', 'Ghatail']
      },
      {
        name: 'Kishoreganj',
        subAreas: ['Kishoreganj Sadar', 'Bhairab', 'Bajitpur', 'Katiadi', 'Karimganj']
      },
      {
        name: 'Manikganj',
        subAreas: ['Manikganj Sadar', 'Singair', 'Saturia', 'Shibalaya']
      },
      {
        name: 'Munshiganj',
        subAreas: ['Munshiganj Sadar', 'Sreenagar', 'Sirajdikhan', 'Lohajang', 'Tongibari']
      },
      {
        name: 'Narsingdi',
        subAreas: ['Narsingdi Sadar', 'Madhabdi', 'Shibpur', 'Raipura', 'Palash']
      },
      {
        name: 'Faridpur',
        subAreas: ['Faridpur Sadar', 'Bhanga', 'Boalmari', 'Nagarkanda', 'Madhukhali']
      },
      {
        name: 'Gopalganj',
        subAreas: ['Gopalganj Sadar', 'Tungipara', 'Kotalipara', 'Kashiani', 'Muksudpur']
      },
      {
        name: 'Madaripur',
        subAreas: ['Madaripur Sadar', 'Shibchar', 'Kalkini', 'Rajoir']
      },
      {
        name: 'Rajbari',
        subAreas: ['Rajbari Sadar', 'Goalanda', 'Pangsha', 'Baliakandi']
      },
      {
        name: 'Shariatpur',
        subAreas: ['Shariatpur Sadar', 'Zajira', 'Naria', 'Bhedarganj', 'Damudya']
      }
    ]
  },
  {
    division: 'Chattogram',
    districts: [
      {
        name: 'Chattogram',
        subAreas: [
          'Agrabad Commercial Area',
          'GEC Circle & Nasirabad',
          'Panchlaish (Medical Gate)',
          'Halishahar Housing Estate',
          'Chawkbazar & Anderkilla',
          'Muradpur & Bahaddarhat',
          'Khulshi',
          'Kotwali',
          'Patenga'
        ]
      },
      {
        name: 'Cox\'s Bazar',
        subAreas: ['Kolatoli Beach Road', 'Teknaf Road', 'Cox\'s Bazar Sadar', 'Chakaria', 'Ramu']
      },
      {
        name: 'Cumilla',
        subAreas: ['Kandirpar', 'Cumilla Sadar', 'Laksam', 'Daudkandi', 'Chauddagram', 'Debidwar']
      },
      {
        name: 'Feni',
        subAreas: ['Feni Sadar', 'Daganbhuiyan', 'Sonagazi', 'Parshuram', 'Chhagalnaiya']
      },
      {
        name: 'Brahmanbaria',
        subAreas: ['Brahmanbaria Sadar', 'Ashuganj', 'Sarail', 'Kasba', 'Nabinagar', 'Akhaura']
      },
      {
        name: 'Noakhali',
        subAreas: ['Maijdee Court', 'Begumganj / Chowmuhani', 'Senbagh', 'Companyganj', 'Chatkhil']
      },
      {
        name: 'Chandpur',
        subAreas: ['Chandpur Sadar', 'Hajiganj', 'Matlab', 'Shahrasti', 'Kachua']
      },
      {
        name: 'Lakshmipur',
        subAreas: ['Lakshmipur Sadar', 'Raipur', 'Ramganj', 'Ramgati']
      },
      {
        name: 'Rangamati',
        subAreas: ['Rangamati Sadar', 'Kaptai', 'Baghaichhari', 'Barkal']
      },
      {
        name: 'Khagrachhari',
        subAreas: ['Khagrachhari Sadar', 'Dighinala', 'Matiranga', 'Ramgarh']
      },
      {
        name: 'Bandarban',
        subAreas: ['Bandarban Sadar', 'Ruma', 'Thanchi', 'Lama', 'Alikadam']
      }
    ]
  },
  {
    division: 'Rajshahi',
    districts: [
      {
        name: 'Rajshahi',
        subAreas: ['Shaheb Bazar', 'Kazla & RU Campus', 'Motihar', 'Boalia', 'Paba', 'Godagari']
      },
      {
        name: 'Bogura',
        subAreas: ['Bogura Sadar', 'Shatmatha', 'Sherpur', 'Shibganj', 'Gabtali', 'Dhunat']
      },
      {
        name: 'Pabna',
        subAreas: ['Pabna Sadar', 'Ishwardi', 'Santhia', 'Chatmohar', 'Bera']
      },
      {
        name: 'Sirajganj',
        subAreas: ['Sirajganj Sadar', 'Shahjadpur', 'Ullapara', 'Belkuchi', 'Kazipur']
      },
      {
        name: 'Naogaon',
        subAreas: ['Naogaon Sadar', 'Patnitala', 'Manda', 'Badalgachhi', 'Mohadevpur']
      },
      {
        name: 'Natore',
        subAreas: ['Natore Sadar', 'Singra', 'Baraigram', 'Bagatipara', 'Gurudaspur']
      },
      {
        name: 'Joypurhat',
        subAreas: ['Joypurhat Sadar', 'Panchbibi', 'Kalai', 'Khetlal', 'Akkelpur']
      },
      {
        name: 'Chapainawabganj',
        subAreas: ['Chapainawabganj Sadar', 'Shibganj', 'Bholahat', 'Gomastapur', 'Nachole']
      }
    ]
  },
  {
    division: 'Khulna',
    districts: [
      {
        name: 'Khulna',
        subAreas: ['Boyra Hospital Road', 'Sonadanga Bus Terminal', 'Khalishpur', 'Shibbari More', 'Daulatpur', 'Rupsha']
      },
      {
        name: 'Jashore',
        subAreas: ['Jashore Sadar', 'Chowrasta', 'Benapole Border Area', 'Jhikargachha', 'Keshabpur', 'Abhaynagar']
      },
      {
        name: 'Satkhira',
        subAreas: ['Satkhira Sadar', 'Kalaroa', 'Tala', 'Shyamnagar', 'Assasuni']
      },
      {
        name: 'Bagerhat',
        subAreas: ['Bagerhat Sadar', 'Mongla Port', 'Morrelganj', 'Fakirhat', 'Rampal']
      },
      {
        name: 'Kushtia',
        subAreas: ['Kushtia Sadar', 'Kumarkhali', 'Bheramara', 'Mirpur', 'Daulatpur']
      },
      {
        name: 'Jhenaidah',
        subAreas: ['Jhenaidah Sadar', 'Kaliganj', 'Kotchandpur', 'Maheshpur', 'Shailkupa']
      },
      {
        name: 'Chuadanga',
        subAreas: ['Chuadanga Sadar', 'Alamdanga', 'Damurhuda', 'Jibannagar']
      },
      {
        name: 'Meherpur',
        subAreas: ['Meherpur Sadar', 'Gangni', 'Mujibnagar']
      },
      {
        name: 'Magura',
        subAreas: ['Magura Sadar', 'Sreepur', 'Shalikha', 'Mohammadpur']
      },
      {
        name: 'Narail',
        subAreas: ['Narail Sadar', 'Lohagara', 'Kalia']
      }
    ]
  },
  {
    division: 'Barishal',
    districts: [
      {
        name: 'Barishal',
        subAreas: ['Barishal Sadar', 'Nathullabad', 'Rupatali', 'Gournadi', 'Bakerganj', 'Wazirpur', 'Banaripara']
      },
      {
        name: 'Bhola',
        subAreas: ['Bhola Sadar', 'Borhanuddin', 'Lalmohan', 'Char Fasson', 'Daulatkhan']
      },
      {
        name: 'Patuakhali',
        subAreas: ['Patuakhali Sadar', 'Kuakata Beach', 'Galachipa', 'Bauphal', 'Kalapara']
      },
      {
        name: 'Pirojpur',
        subAreas: ['Pirojpur Sadar', 'Bhandaria', 'Mathbaria', 'Nazirpur', 'Nesarabad (Swarupkathi)']
      },
      {
        name: 'Barguna',
        subAreas: ['Barguna Sadar', 'Amtali', 'Patharghata', 'Betagi']
      },
      {
        name: 'Jhalokathi',
        subAreas: ['Jhalokathi Sadar', 'Rajapur', 'Nalchhiti', 'Kathalia']
      }
    ]
  },
  {
    division: 'Sylhet',
    districts: [
      {
        name: 'Sylhet',
        subAreas: ['Zindabazar', 'Ambarkhana', 'Subidbazar', 'Shibganj', 'Tilagarh', 'Beanibazar', 'Golapganj', 'Osmaninagar']
      },
      {
        name: 'Moulvibazar',
        subAreas: ['Moulvibazar Sadar', 'Sreemangal', 'Kulaura', 'Barlekha', 'Kamalganj']
      },
      {
        name: 'Habiganj',
        subAreas: ['Habiganj Sadar', 'Madhabpur', 'Nabiganj', 'Bahubal', 'Chunarughat']
      },
      {
        name: 'Sunamganj',
        subAreas: ['Sunamganj Sadar', 'Chhatak', 'Jagannathpur', 'Tahirpur', 'Derai']
      }
    ]
  },
  {
    division: 'Rangpur',
    districts: [
      {
        name: 'Rangpur',
        subAreas: ['Rangpur Sadar', 'Jajira More', 'Dhap Medical Area', 'Mithapukur', 'Pirganj', 'Badarganj']
      },
      {
        name: 'Dinajpur',
        subAreas: ['Dinajpur Sadar', 'Ghoraghat', 'Birganj', 'Phulbari', 'Parbatipur', 'Kaharole']
      },
      {
        name: 'Gaibandha',
        subAreas: ['Gaibandha Sadar', 'Gobindaganj', 'Palashbari', 'Sundarganj', 'Sadullapur']
      },
      {
        name: 'Kurigram',
        subAreas: ['Kurigram Sadar', 'Nageshwari', 'Bhurungamari', 'Ulipur', 'Chilmari']
      },
      {
        name: 'Lalmonirhat',
        subAreas: ['Lalmonirhat Sadar', 'Patgram', 'Hatibandha', 'Kaliganj', 'Aditmari']
      },
      {
        name: 'Nilphamari',
        subAreas: ['Nilphamari Sadar', 'Saidpur', 'Domar', 'Jaldhaka', 'Kishoreganj']
      },
      {
        name: 'Panchagarh',
        subAreas: ['Panchagarh Sadar', 'Tetulia', 'Boda', 'Debiganj', 'Atwari']
      },
      {
        name: 'Thakurgaon',
        subAreas: ['Thakurgaon Sadar', 'Pirganj', 'Ranisankail', 'Haripur', 'Baliadangi']
      }
    ]
  },
  {
    division: 'Mymensingh',
    districts: [
      {
        name: 'Mymensingh',
        subAreas: ['Mymensingh Sadar', 'Medical College Gate', 'Muktagachha', 'Trishal', 'Bhaluka', 'Gafargaon', 'Ishwarganj']
      },
      {
        name: 'Jamalpur',
        subAreas: ['Jamalpur Sadar', 'Sarishabari', 'Melandaha', 'Islampur', 'Dewanganj', 'Bakshiganj']
      },
      {
        name: 'Netrokona',
        subAreas: ['Netrokona Sadar', 'Durgapur', 'Kendua', 'Mohanganj', 'Kalmakanda', 'Purbadhala']
      },
      {
        name: 'Sherpur',
        subAreas: ['Sherpur Sadar', 'Nalitabari', 'Nakla', 'Jhenaigati', 'Sreebardi']
      }
    ]
  }
];

export const INITIAL_DONORS: Donor[] = [
  {
    id: 'donor-1',
    name: 'Tanzid Ahmed',
    phone: '+8801711234567',
    whatsapp: '8801711234567',
    email: 'tanzid.donor@example.com',
    bloodType: 'O+',
    division: 'Dhaka',
    district: 'Dhaka',
    area: 'Dhanmondi',
    subArea: 'Dhanmondi (Road 27 / Rangs Nasim)',
    availability: 'available',
    lastDonationDate: '2026-06-10', // ~119 days ago (fully eligible!)
    totalDonations: 8,
    rating: 4.95,
    reviewCount: 14,
    verified: true,
    heroBadge: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Voluntary blood donor for 4 years. Ready for critical and thalassemia patients in Dhanmondi/Green Life Hospital vicinity.',
    readyForEmergency: true,
    age: 27,
    gender: 'Male',
    reviews: [
      {
        id: 'rev-1',
        donorId: 'donor-1',
        reviewerName: 'Dr. Rafiqul Islam',
        rating: 5,
        date: '2026-06-12',
        comment: 'Arrived at Square Hospital within 25 minutes of notice. Extremely polite and healthy donor. Lifesaver!',
        bloodTypeProvided: 'O+',
        hospitalName: 'Square Hospital, Panthapath'
      },
      {
        id: 'rev-2',
        donorId: 'donor-1',
        reviewerName: 'Farhana Yeasmin',
        rating: 5,
        date: '2026-02-18',
        comment: 'Donated for my mother’s cardiac bypass. Forever grateful to Tanzid bhai.',
        bloodTypeProvided: 'O+',
        hospitalName: 'National Heart Foundation'
      }
    ]
  },
  {
    id: 'donor-2',
    name: 'Sadia Sultana',
    phone: '+8801822987654',
    whatsapp: '8801822987654',
    email: 'sadia.bloodlink@example.com',
    bloodType: 'A+',
    division: 'Dhaka',
    district: 'Dhaka',
    area: 'Mirpur',
    subArea: 'Mirpur 10 & 2 Circle',
    availability: 'available',
    lastDonationDate: '2026-05-20', // ~140 days ago
    totalDonations: 5,
    rating: 4.88,
    reviewCount: 9,
    verified: true,
    heroBadge: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Software engineer & passionate life saver. Always available on WhatsApp.',
    readyForEmergency: true,
    age: 25,
    gender: 'Female',
    reviews: [
      {
        id: 'rev-3',
        donorId: 'donor-2',
        reviewerName: 'Kamrul Hasan',
        rating: 5,
        date: '2026-05-21',
        comment: 'Sadia apu helped us when our delivery patient was hemorrhaging. Very calm and cooperative.',
        bloodTypeProvided: 'A+',
        hospitalName: 'Al-Helal Specialized Hospital'
      }
    ]
  },
  {
    id: 'donor-3',
    name: 'Mahbubur Rahman',
    phone: '+8801912348899',
    whatsapp: '8801912348899',
    email: 'mahbub.o.neg@example.com',
    bloodType: 'O-', // Rare universal donor
    division: 'Dhaka',
    district: 'Dhaka',
    area: 'Uttara',
    subArea: 'Uttara (Sector 3, 7, 11)',
    availability: 'available',
    lastDonationDate: '2026-06-25', // ~104 days ago
    totalDonations: 11,
    rating: 5.0,
    reviewCount: 21,
    verified: true,
    heroBadge: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Universal donor (O-). Dedicated to rare group emergencies across Dhaka Medical & Kuwait Bangladesh Friendship Hospital.',
    readyForEmergency: true,
    age: 32,
    gender: 'Male',
    reviews: [
      {
        id: 'rev-4',
        donorId: 'donor-3',
        reviewerName: 'Enamul Haque',
        rating: 5,
        date: '2026-06-26',
        comment: 'O- is almost impossible to find at midnight. Mahbub bhai answered the first ring and saved our child.',
        bloodTypeProvided: 'O-',
        hospitalName: 'Dhaka Medical College'
      }
    ]
  },
  {
    id: 'donor-4',
    name: 'Nusrat Jahan',
    phone: '+8801677890123',
    whatsapp: '8801677890123',
    email: 'nusrat.bpos@example.com',
    bloodType: 'B+',
    division: 'Dhaka',
    district: 'Dhaka',
    area: 'Gulshan',
    subArea: 'Gulshan 1 & 2',
    availability: 'busy',
    lastDonationDate: '2026-07-02', // ~97 days ago
    totalDonations: 3,
    rating: 4.75,
    reviewCount: 6,
    verified: true,
    heroBadge: false,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Banker. Usually available after 5 PM and on weekends in Gulshan / Banani area.',
    readyForEmergency: false,
    age: 26,
    gender: 'Female'
  },
  {
    id: 'donor-5',
    name: 'Asif Chowdhury',
    phone: '+8801552345678',
    whatsapp: '8801552345678',
    email: 'asif.abneg@example.com',
    bloodType: 'AB-', // Rare
    division: 'Chattogram',
    district: 'Chattogram',
    area: 'Agrabad',
    subArea: 'Agrabad Commercial Area',
    availability: 'available',
    lastDonationDate: '2026-06-18', // ~111 days ago
    totalDonations: 6,
    rating: 4.9,
    reviewCount: 8,
    verified: true,
    heroBadge: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Rare AB- donor in Chittagong. Connected with Chittagong Medical College Hospital network.',
    readyForEmergency: true,
    age: 29,
    gender: 'Male'
  },
  {
    id: 'donor-6',
    name: 'Rakibul Islam',
    phone: '+8801733445566',
    whatsapp: '8801733445566',
    email: 'rakib.bneg@example.com',
    bloodType: 'B-',
    division: 'Dhaka',
    district: 'Dhaka',
    area: 'Mohammadpur',
    subArea: 'Mohammadpur (Ring Road / Town Hall)',
    availability: 'donated_recently',
    lastDonationDate: '2026-09-15', // only 22 days ago! (Still in recovery countdown)
    totalDonations: 4,
    rating: 4.8,
    reviewCount: 5,
    verified: true,
    heroBadge: false,
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    bio: 'Donated 3 weeks ago at NICVD. Resting for safe hemoglobin restoration.',
    readyForEmergency: false,
    age: 24,
    gender: 'Male'
  },
  {
    id: 'donor-7',
    name: 'Tanvir Hossain',
    phone: '+8801811776655',
    whatsapp: '8801811776655',
    email: 'tanvir.abpos@example.com',
    bloodType: 'AB+',
    division: 'Sylhet',
    district: 'Sylhet',
    area: 'Zindabazar',
    subArea: 'Zindabazar',
    availability: 'available',
    lastDonationDate: '2026-05-10', // ~150 days ago
    totalDonations: 7,
    rating: 4.85,
    reviewCount: 11,
    verified: true,
    heroBadge: true,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    bio: 'Universal plasma donor (AB+). Active donor in Sylhet MAG Osmani Medical College Hospital.',
    readyForEmergency: true,
    age: 28,
    gender: 'Male'
  },
  {
    id: 'donor-8',
    name: 'Sumaiya Akter',
    phone: '+8801933887766',
    whatsapp: '8801933887766',
    email: 'sumaiya.aneg@example.com',
    bloodType: 'A-',
    division: 'Dhaka',
    district: 'Dhaka',
    area: 'Banani',
    subArea: 'Banani & Kamal Ataturk',
    availability: 'available',
    lastDonationDate: '2026-06-05', // ~124 days ago
    totalDonations: 4,
    rating: 4.9,
    reviewCount: 7,
    verified: true,
    heroBadge: false,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: 'A- blood donor. University student, can reach Kurmitola General Hospital or United Hospital quickly.',
    readyForEmergency: true,
    age: 23,
    gender: 'Female'
  }
];

export const INITIAL_REQUESTS: BloodRequest[] = [
  {
    id: 'req-1',
    patientName: 'Khadija Begum (Age 54)',
    bloodType: 'O-',
    unitsNeeded: 2,
    hospitalName: 'Dhaka Medical College Hospital (Burn & Surgery Unit)',
    division: 'Dhaka',
    district: 'Dhaka',
    area: 'Old Dhaka',
    subArea: 'Old Dhaka (Sadarghat / Lalbagh)',
    requestType: 'emergency',
    requiredByDate: '2026-10-07',
    requiredByTime: 'Today by 2:00 PM (Emergency Surgery)',
    contactPhone: '+8801712998877',
    alternativePhone: '+8801819665544',
    reason: 'Severe accident trauma & emergency abdominal surgery. Hemoglobin dropped to 6.2.',
    status: 'open',
    createdAt: '2026-10-07T08:15:00Z',
    responsesCount: 3,
    verifiedHospital: true,
    contactPerson: 'Md. Tareq (Son)'
  },
  {
    id: 'req-2',
    patientName: 'Master Aayan (Age 6)',
    bloodType: 'B+',
    unitsNeeded: 1,
    hospitalName: 'Bangladesh Shishu (Children) Hospital, Agargaon',
    division: 'Dhaka',
    district: 'Dhaka',
    area: 'Mohammadpur',
    subArea: 'Mohammadpur (Ring Road / Town Hall)',
    requestType: 'emergency',
    requiredByDate: '2026-10-07',
    requiredByTime: 'Today by 4:30 PM',
    contactPhone: '+8801911443322',
    alternativePhone: '+8801677221100',
    reason: 'Thalassemia regular transfusion required. Previous donor fell sick.',
    status: 'open',
    createdAt: '2026-10-07T09:30:00Z',
    responsesCount: 1,
    verifiedHospital: true,
    contactPerson: 'Sultana Parveen (Mother)'
  },
  {
    id: 'req-3',
    patientName: 'Farid Uddin Ahmed (Age 61)',
    bloodType: 'A+',
    unitsNeeded: 3,
    hospitalName: 'National Heart Foundation, Mirpur',
    division: 'Dhaka',
    district: 'Dhaka',
    area: 'Mirpur',
    subArea: 'Mirpur 10 & 2 Circle',
    requestType: 'upcoming_operation',
    requiredByDate: '2026-10-09',
    requiredByTime: 'Morning 9:00 AM (Scheduled Bypass)',
    contactPhone: '+8801819332211',
    reason: 'Triple vessel coronary artery bypass grafting (CABG). Cross-matching needs to be done tomorrow.',
    status: 'open',
    createdAt: '2026-10-06T18:00:00Z',
    responsesCount: 4,
    verifiedHospital: true,
    contactPerson: 'Rashed Farid (Son)'
  },
  {
    id: 'req-4',
    patientName: 'Nasrin Sultana (Age 28)',
    bloodType: 'AB-',
    unitsNeeded: 2,
    hospitalName: 'Chittagong Medical College Hospital (Gynecology Ward)',
    division: 'Chattogram',
    district: 'Chattogram',
    area: 'Panchlaish',
    subArea: 'Panchlaish (Medical Gate)',
    requestType: 'emergency',
    requiredByDate: '2026-10-07',
    requiredByTime: 'Emergency C-Section in 3 hours',
    contactPhone: '+8801755123499',
    reason: 'Placenta previa complicated delivery. Rare blood group desperately needed.',
    status: 'open',
    createdAt: '2026-10-07T09:50:00Z',
    responsesCount: 0,
    verifiedHospital: true,
    contactPerson: 'Arifuzzaman (Husband)'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'URGENT: O- Blood Needed in 2 Hours',
    titleBn: 'জরুরি: ২ ঘণ্টার মধ্যে O- রক্ত প্রয়োজন',
    message: 'Dhaka Medical College Hospital: Emergency accident surgery. 2 bags needed immediately.',
    messageBn: 'ঢাকা মেডিকেল কলেজ হাসপাতাল: জরুরি দুর্ঘটনা অপারেশন। অবিলম্বে ২ ব্যাগ O- রক্ত প্রয়োজন।',
    type: 'emergency',
    timestamp: '10 mins ago',
    read: false,
    bloodGroup: 'O-',
    targetRequestId: 'req-1',
    hospital: 'Dhaka Medical College'
  },
  {
    id: 'notif-2',
    title: 'Rare Group Alert: AB- Needed in Chittagong',
    titleBn: 'জরুরি বিরল গ্রুপ: চট্টগ্রামে AB- রক্তের সন্ধান',
    message: 'Chittagong Medical College: Emergency C-section for critical patient.',
    messageBn: 'চট্টগ্রাম মেডিকেল কলেজ: মুমূর্ষু প্রসূতি রোগীর জন্য জরুরি ২ ব্যাগ AB- রক্ত প্রয়োজন।',
    type: 'emergency',
    timestamp: '25 mins ago',
    read: false,
    bloodGroup: 'AB-',
    targetRequestId: 'req-4',
    hospital: 'Chittagong Medical College'
  },
  {
    id: 'notif-3',
    title: 'Donor Responded to Request',
    titleBn: 'রক্তদাতা আপনার আহ্বানে সাড়া দিয়েছেন',
    message: 'Tanzid Ahmed offered to donate O+ blood for your hospital case.',
    messageBn: 'তানজিদ আহমেদ আপনার রক্তের আবেদনে সাড়া দিয়েছেন। সরাসরি যোগাযোগ করুন।',
    type: 'match',
    timestamp: '1 hour ago',
    read: true
  }
];
