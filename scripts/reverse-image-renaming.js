/**
 * Reverse Image Renaming Script
 * This script reverses the SEO filename renaming, restoring original filenames
 */

const fs = require('fs');
const path = require('path');

// Mapping from SEO Filename → Original Filename (reversed from guide)
const reverseMapping = {
  'happy-golden-retriever-running-trail-dog-hike-waunakee-wi-river-paws.jpg': '538165019_1365628118899330_3229080048847136059_n.jpg',
  'dog-care-team-river-paws-madison-wi-happy-pet-grooming-staff.jpg': '540136468_1365628605565948_5353836731541593829_n.jpg',
  'gentle-golden-retriever-closeup-dog-grooming-waunakee-wi-river-paws.jpg': '538274264_1365628915565917_3001288411207619085_n.jpg',
  'happy-doodle-dog-hike-madison-wi-river-paws-adventure.jpg': '539199008_1365630352232440_6792005565152796485_n.jpg',
  'german-shepherd-dog-playtime-hike-river-paws-deforest-wi.jpg': '539501390_1365630468899095_7681687580582236953_n.jpg',
  'dog-hiking-pack-friends-waunakee-wi-river-paws-group-adventure.jpg': '539599730_1366649145463894_9200632677353866664_n.jpg',
  'joyful-retriever-dog-hike-field-sun-prairie-wi-river-paws.jpg': '540499293_1366649442130531_5682010309802495335_n.jpg',
  'small-terrier-running-dog-trail-sun-prairie-wi-river-paws.jpg': '539031724_1366649632130512_8617142898666740673_n.jpg',
  'small-dogs-exploring-field-river-paws-waunakee-wi-pet-adventure.jpg': '538933740_1366649692130506_8105250262466927869_n.jpg',
  'happy-bernadoodle-dog-hiking-waunakee-wi-river-paws-pack.jpg': '538935205_1366649768797165_1075538928154573289_n.jpg',
  'happy-dogs-variety-breeds-river-paws-madison-wi-pet-adventure.jpg': '539647849_1366649792130496_5596781929514296017_n.jpg',
  'playful-small-dogs-rolling-grass-river-paws-deforest-wi-adventure.jpg': '539317915_1366649885463820_2390991168028086200_n.jpg',
  'happy-golden-retriever-dog-hike-waunakee-wi-river-paws.jpg': '540391686_1366649948797147_4216200916228666254_n.jpg',
  'dogs-hiking-group-field-river-paws-sun-prairie-wi-adventure.jpg': '539171870_1366650015463807_7659309697710330063_n.jpg',
  'brindle-dog-closeup-river-paws-madison-wi-pet-adventure.jpg': '539461475_1367591515369657_5138477106897467852_n.jpg',
  'happy-golden-retriever-stick-play-river-paws-waunakee-wi-dog-adventure.jpg': '539208750_1368339991961476_4131202790523178653_n.jpg',
  'dogs-boarding-dog-bus-river-paws-waunakee-wi-pet-transport.jpg': '540978334_1368340108628131_233980314175602017_n.jpg',
  'dog-on-bus-seat-river-paws-waunakee-wi-pet-transport-service.jpg': '538424096_1368340251961450_5206796316295979494_n.jpg',
  'dogs-running-uphill-trail-river-paws-sun-prairie-wi-pack-adventure.jpg': '539462975_1368340358628106_2688880185866765828_n.jpg',
  'birthday-golden-retriever-dog-party-river-paws-madison-wi-happy-pet.jpg': '538293115_1368340415294767_5606664633230959323_n.jpg',
  'relaxed-golden-retriever-grass-river-paws-deforest-wi-dog-care.jpg': '541442555_1372002008261941_8392178421431288853_n.jpg',
  'golden-retriever-playing-toy-river-paws-madison-wi-dog-hike.jpg': '542726615_1372002031595272_2750831749102909439_n.jpg',
  'happy-golden-retriever-rolling-grass-river-paws-deforest-wi-pet-care.jpg': '542742178_1372002628261879_3804591776552202117_n.jpg',
  'happy-bernadoodle-running-river-paws-madison-wi-dog-adventure.jpg': '540412589_1372002768261865_6156164758662863711_n.jpg',
  'calm-golden-retriever-portrait-river-paws-waunakee-wi-dog-grooming.jpg': '541730099_1372002798261862_7551078170991138602_n.jpg',
  'dog-handler-caring-river-paws-waunakee-wi-team-love.jpg': '542102655_1372998568162285_7025108831859301308_n.jpg',
  'happy-blue-eyed-dog-playing-ball-river-paws-madison-wi-adventure.jpg': '539984995_1372998614828947_5661527881519578396_n.jpg',
  'dog-pack-running-trail-river-paws-deforest-wi-adventure-out.jpg': '541619717_1372999868162155_6287918029751787480_n.jpg',
  'dogs-playing-grass-river-paws-waunakee-wi-adventure.jpg': '540341194_1373024464826362_4836068032839831444_n.jpg',
  'dog-and-handler-field-river-paws-madison-wi-adventure.jpg': '541307848_1373909044737904_4761853553742333210_n.jpg',
  'dog-smiling-bus-seat-river-paws-waunakee-wi-pet-transport.jpg': '541736385_1373907268071415_98099061567662543_n.jpg',
  'dog-bus-loading-river-paws-madison-wi-transport-service.jpg': '542226414_1374810091314466_3051555521896106559_n.jpg',
  'dog-bus-driver-river-paws-waunakee-wi-pet-transport.jpg': '544726699_1374810977981044_3598040394495032177_n.jpg',
  'dogs-running-meadow-river-paws-sun-prairie-wi-adventure.jpg': '542292856_1374811261314349_2755044560538114645_n.jpg',
  'dogs-waiting-trailhead-river-paws-waunakee-wi-hike.jpg': '541531217_1374811421314333_507621615270438173_n.jpg',
  'dogs-sniffing-field-river-paws-madison-wi-adventure.jpg': '543213341_1374811851314290_6408359794484314989_n.jpg',
  'dog-hiking-view-river-paws-deforest-wi-adventure.jpg': '544893321_1377391314389677_5129646678029277968_n.jpg',
  'doodle-dog-cuddling-handler-river-paws-madison-wi-pet-care.jpg': '544891531_1377391344389674_193903772942779813_n.jpg',
  'happy-dog-pack-river-paws-madison-wi-adventure-hiking-service.jpg': '546128763_1378480187614123_7409667708221744541_n.jpg',
  'dog-bus-window-paw-river-paws-waunakee-wi-transport.jpg': '556606815_1398511552277653_8452349677168927543_n.jpg',
};

// Pics directory removed - no longer used
// const picsDir = path.join(__dirname, '..', 'public', 'Pics');

console.log('Reversing image renaming...\n');

let renamedCount = 0;
let errorCount = 0;

// Rename each SEO filename back to original
for (const [seoFilename, originalFilename] of Object.entries(reverseMapping)) {
  const seoPath = path.join(picsDir, seoFilename);
  const originalPath = path.join(picsDir, originalFilename);
  
  if (fs.existsSync(seoPath)) {
    try {
      fs.renameSync(seoPath, originalPath);
      console.log(`✅ Renamed: ${seoFilename} → ${originalFilename}`);
      renamedCount++;
    } catch (error) {
      console.error(`❌ Error renaming ${seoFilename}:`, error.message);
      errorCount++;
    }
  } else {
    console.log(`⚠️  File not found: ${seoFilename}`);
  }
}

console.log(`\n✅ Renaming complete!`);
console.log(`   Renamed: ${renamedCount} files`);
if (errorCount > 0) {
  console.log(`   Errors: ${errorCount} files`);
}




