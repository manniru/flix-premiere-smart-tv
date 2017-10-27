var Language=(function(){var strings=Class.create({init:function(){this.commonStrings={en:{cancel:'Cancel',noThanks:'No Thanks',confirm:'Confirm',purchaseConfirm:'Purchase Confirmation',availabilityNote:'Each episode will only be available for 72 hours after you start watching it.',purchaseCost:'This purchase will cost:',packageNote:'This token package unlocks special offers',QRInstruction:'Scan the QR code above or visit www.fishingtv.com'}};this.buySeriesTable='<ul><li id="ep_1"><div class="cell"><span class="epNumber">Ep. 1:</span><span class="epTitle"></span></div><div class="cell tokens"></div></li><li id="ep_2"><div class="cell"><span class="epNumber">Ep. 2:</span><span class="epTitle"></span></div><div class="cell tokens"></div></li><li id="ep_3"><div class="cell"><span class="epNumber">Ep. 3:</span><span class="epTitle"></span></div><div class="cell tokens"></div></li><li id="ep_4"><div class="cell"><span class="epNumber">Ep. 4:</span><span class="epTitle"></span></div><div class="cell tokens"></div></li><li id="ep_5"><div class="cell"><span class="epNumber">Ep. 5:</span><span class="epTitle"></span></div><div class="cell tokens"></div></li><li id="ep_6"><div class="cell"><span class="epNumber">Ep. 6:</span><span class="epTitle"></span></div><div class="cell tokens"></div></li><li id="ep_7"><div class="cell"><span class="epNumber">Ep. 7:</span><span class="epTitle"></span></div><div class="cell tokens"></div></li><li id="total"><div class="cell">Total:</div><div class="cell tokens"></div></li><li id="promotionTotal"><div class="cell">Promotion price:</div><div class="cell tokens"></div></li></ul><p>'+this.commonStrings.en.availabilityNote+'</p>';this.dialog={en:{remove:{header:'Remove',content:'Are you sure you want to remove this',red:this.commonStrings.en.cancel,yellow:'',green:this.commonStrings.en.confirm},buyEpisode:{header:'',content:this.commonStrings.en.availabilityNote,red:this.commonStrings.en.noThanks,yellow:'Buy Series',green:'Buy Episode'},buyEpisodeConfirm:{header:this.commonStrings.en.purchaseConfirm,content:'<p>Episode:<span></span></p><p>This purchase will cost:<span></span></p>',red:this.commonStrings.en.noThanks,yellow:'',green:this.commonStrings.en.confirm},buyEpisodeConfirmWatch:{header:'Start Watching',content:'<p>Do you want to start watching now?</p><p>You will have 72 hours until it expires.</p>',red:'later',yellow:'Watchlist',green:'Watch Now'},buySeries:{header:'',content:this.buySeriesTable,red:this.commonStrings.en.noThanks,yellow:'',green:this.commonStrings.en.confirm},buySeriesConfirm:{header:this.commonStrings.en.purchaseConfirm,content:'<p><span>Series:</span><span></span></p><p><span></span><span></span></p>',red:this.commonStrings.en.noThanks,yellow:'',green:this.commonStrings.en.confirm},player10s:{header:'',content:'<p>You have just watched a clip from the episode <span></span> from <span></span> series.</p><p>Do you wish to go to the full episode?</p>',red:'Skip (<span></span>)',yellow:'',green:'Full Episode'}}};},unload:function(){}});return new strings();})();