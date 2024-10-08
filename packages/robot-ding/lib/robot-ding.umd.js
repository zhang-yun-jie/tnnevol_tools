(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('http'), require('https'), require('url'), require('stream'), require('assert'), require('tty'), require('util'), require('os'), require('zlib')) :
	typeof define === 'function' && define.amd ? define(['http', 'https', 'url', 'stream', 'assert', 'tty', 'util', 'os', 'zlib'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.index = factory(global.require$$1$1, global.require$$2, global.require$$0$2, global.require$$3, global.require$$4, global.require$$0$1, global.require$$1, global.require$$0, global.require$$8));
})(this, (function (require$$1$1, require$$2, require$$0$2, require$$3, require$$4, require$$0$1, require$$1, require$$0, require$$8) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var hmacSha256 = {exports: {}};

	function commonjsRequire(path) {
		throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
	}

	var core = {exports: {}};

	var hasRequiredCore;

	function requireCore () {
		if (hasRequiredCore) return core.exports;
		hasRequiredCore = 1;
		(function (module, exports) {
	(function (root, factory) {
				{
					// CommonJS
					module.exports = factory();
				}
			}(commonjsGlobal, function () {

				/*globals window, global, require*/

				/**
				 * CryptoJS core components.
				 */
				var CryptoJS = CryptoJS || (function (Math, undefined$1) {

				    var crypto;

				    // Native crypto from window (Browser)
				    if (typeof window !== 'undefined' && window.crypto) {
				        crypto = window.crypto;
				    }

				    // Native crypto in web worker (Browser)
				    if (typeof self !== 'undefined' && self.crypto) {
				        crypto = self.crypto;
				    }

				    // Native crypto from worker
				    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
				        crypto = globalThis.crypto;
				    }

				    // Native (experimental IE 11) crypto from window (Browser)
				    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
				        crypto = window.msCrypto;
				    }

				    // Native crypto from global (NodeJS)
				    if (!crypto && typeof commonjsGlobal !== 'undefined' && commonjsGlobal.crypto) {
				        crypto = commonjsGlobal.crypto;
				    }

				    // Native crypto import via require (NodeJS)
				    if (!crypto && typeof commonjsRequire === 'function') {
				        try {
				            crypto = require('crypto');
				        } catch (err) {}
				    }

				    /*
				     * Cryptographically secure pseudorandom number generator
				     *
				     * As Math.random() is cryptographically not safe to use
				     */
				    var cryptoSecureRandomInt = function () {
				        if (crypto) {
				            // Use getRandomValues method (Browser)
				            if (typeof crypto.getRandomValues === 'function') {
				                try {
				                    return crypto.getRandomValues(new Uint32Array(1))[0];
				                } catch (err) {}
				            }

				            // Use randomBytes method (NodeJS)
				            if (typeof crypto.randomBytes === 'function') {
				                try {
				                    return crypto.randomBytes(4).readInt32LE();
				                } catch (err) {}
				            }
				        }

				        throw new Error('Native crypto module could not be used to get secure random number.');
				    };

				    /*
				     * Local polyfill of Object.create

				     */
				    var create = Object.create || (function () {
				        function F() {}

				        return function (obj) {
				            var subtype;

				            F.prototype = obj;

				            subtype = new F();

				            F.prototype = null;

				            return subtype;
				        };
				    }());

				    /**
				     * CryptoJS namespace.
				     */
				    var C = {};

				    /**
				     * Library namespace.
				     */
				    var C_lib = C.lib = {};

				    /**
				     * Base object for prototypal inheritance.
				     */
				    var Base = C_lib.Base = (function () {


				        return {
				            /**
				             * Creates a new object that inherits from this object.
				             *
				             * @param {Object} overrides Properties to copy into the new object.
				             *
				             * @return {Object} The new object.
				             *
				             * @static
				             *
				             * @example
				             *
				             *     var MyType = CryptoJS.lib.Base.extend({
				             *         field: 'value',
				             *
				             *         method: function () {
				             *         }
				             *     });
				             */
				            extend: function (overrides) {
				                // Spawn
				                var subtype = create(this);

				                // Augment
				                if (overrides) {
				                    subtype.mixIn(overrides);
				                }

				                // Create default initializer
				                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
				                    subtype.init = function () {
				                        subtype.$super.init.apply(this, arguments);
				                    };
				                }

				                // Initializer's prototype is the subtype object
				                subtype.init.prototype = subtype;

				                // Reference supertype
				                subtype.$super = this;

				                return subtype;
				            },

				            /**
				             * Extends this object and runs the init method.
				             * Arguments to create() will be passed to init().
				             *
				             * @return {Object} The new object.
				             *
				             * @static
				             *
				             * @example
				             *
				             *     var instance = MyType.create();
				             */
				            create: function () {
				                var instance = this.extend();
				                instance.init.apply(instance, arguments);

				                return instance;
				            },

				            /**
				             * Initializes a newly created object.
				             * Override this method to add some logic when your objects are created.
				             *
				             * @example
				             *
				             *     var MyType = CryptoJS.lib.Base.extend({
				             *         init: function () {
				             *             // ...
				             *         }
				             *     });
				             */
				            init: function () {
				            },

				            /**
				             * Copies properties into this object.
				             *
				             * @param {Object} properties The properties to mix in.
				             *
				             * @example
				             *
				             *     MyType.mixIn({
				             *         field: 'value'
				             *     });
				             */
				            mixIn: function (properties) {
				                for (var propertyName in properties) {
				                    if (properties.hasOwnProperty(propertyName)) {
				                        this[propertyName] = properties[propertyName];
				                    }
				                }

				                // IE won't copy toString using the loop above
				                if (properties.hasOwnProperty('toString')) {
				                    this.toString = properties.toString;
				                }
				            },

				            /**
				             * Creates a copy of this object.
				             *
				             * @return {Object} The clone.
				             *
				             * @example
				             *
				             *     var clone = instance.clone();
				             */
				            clone: function () {
				                return this.init.prototype.extend(this);
				            }
				        };
				    }());

				    /**
				     * An array of 32-bit words.
				     *
				     * @property {Array} words The array of 32-bit words.
				     * @property {number} sigBytes The number of significant bytes in this word array.
				     */
				    var WordArray = C_lib.WordArray = Base.extend({
				        /**
				         * Initializes a newly created word array.
				         *
				         * @param {Array} words (Optional) An array of 32-bit words.
				         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.lib.WordArray.create();
				         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
				         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
				         */
				        init: function (words, sigBytes) {
				            words = this.words = words || [];

				            if (sigBytes != undefined$1) {
				                this.sigBytes = sigBytes;
				            } else {
				                this.sigBytes = words.length * 4;
				            }
				        },

				        /**
				         * Converts this word array to a string.
				         *
				         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
				         *
				         * @return {string} The stringified word array.
				         *
				         * @example
				         *
				         *     var string = wordArray + '';
				         *     var string = wordArray.toString();
				         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
				         */
				        toString: function (encoder) {
				            return (encoder || Hex).stringify(this);
				        },

				        /**
				         * Concatenates a word array to this word array.
				         *
				         * @param {WordArray} wordArray The word array to append.
				         *
				         * @return {WordArray} This word array.
				         *
				         * @example
				         *
				         *     wordArray1.concat(wordArray2);
				         */
				        concat: function (wordArray) {
				            // Shortcuts
				            var thisWords = this.words;
				            var thatWords = wordArray.words;
				            var thisSigBytes = this.sigBytes;
				            var thatSigBytes = wordArray.sigBytes;

				            // Clamp excess bits
				            this.clamp();

				            // Concat
				            if (thisSigBytes % 4) {
				                // Copy one byte at a time
				                for (var i = 0; i < thatSigBytes; i++) {
				                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
				                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
				                }
				            } else {
				                // Copy one word at a time
				                for (var j = 0; j < thatSigBytes; j += 4) {
				                    thisWords[(thisSigBytes + j) >>> 2] = thatWords[j >>> 2];
				                }
				            }
				            this.sigBytes += thatSigBytes;

				            // Chainable
				            return this;
				        },

				        /**
				         * Removes insignificant bits.
				         *
				         * @example
				         *
				         *     wordArray.clamp();
				         */
				        clamp: function () {
				            // Shortcuts
				            var words = this.words;
				            var sigBytes = this.sigBytes;

				            // Clamp
				            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
				            words.length = Math.ceil(sigBytes / 4);
				        },

				        /**
				         * Creates a copy of this word array.
				         *
				         * @return {WordArray} The clone.
				         *
				         * @example
				         *
				         *     var clone = wordArray.clone();
				         */
				        clone: function () {
				            var clone = Base.clone.call(this);
				            clone.words = this.words.slice(0);

				            return clone;
				        },

				        /**
				         * Creates a word array filled with random bytes.
				         *
				         * @param {number} nBytes The number of random bytes to generate.
				         *
				         * @return {WordArray} The random word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.lib.WordArray.random(16);
				         */
				        random: function (nBytes) {
				            var words = [];

				            for (var i = 0; i < nBytes; i += 4) {
				                words.push(cryptoSecureRandomInt());
				            }

				            return new WordArray.init(words, nBytes);
				        }
				    });

				    /**
				     * Encoder namespace.
				     */
				    var C_enc = C.enc = {};

				    /**
				     * Hex encoding strategy.
				     */
				    var Hex = C_enc.Hex = {
				        /**
				         * Converts a word array to a hex string.
				         *
				         * @param {WordArray} wordArray The word array.
				         *
				         * @return {string} The hex string.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
				         */
				        stringify: function (wordArray) {
				            // Shortcuts
				            var words = wordArray.words;
				            var sigBytes = wordArray.sigBytes;

				            // Convert
				            var hexChars = [];
				            for (var i = 0; i < sigBytes; i++) {
				                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
				                hexChars.push((bite >>> 4).toString(16));
				                hexChars.push((bite & 0x0f).toString(16));
				            }

				            return hexChars.join('');
				        },

				        /**
				         * Converts a hex string to a word array.
				         *
				         * @param {string} hexStr The hex string.
				         *
				         * @return {WordArray} The word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
				         */
				        parse: function (hexStr) {
				            // Shortcut
				            var hexStrLength = hexStr.length;

				            // Convert
				            var words = [];
				            for (var i = 0; i < hexStrLength; i += 2) {
				                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
				            }

				            return new WordArray.init(words, hexStrLength / 2);
				        }
				    };

				    /**
				     * Latin1 encoding strategy.
				     */
				    var Latin1 = C_enc.Latin1 = {
				        /**
				         * Converts a word array to a Latin1 string.
				         *
				         * @param {WordArray} wordArray The word array.
				         *
				         * @return {string} The Latin1 string.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
				         */
				        stringify: function (wordArray) {
				            // Shortcuts
				            var words = wordArray.words;
				            var sigBytes = wordArray.sigBytes;

				            // Convert
				            var latin1Chars = [];
				            for (var i = 0; i < sigBytes; i++) {
				                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
				                latin1Chars.push(String.fromCharCode(bite));
				            }

				            return latin1Chars.join('');
				        },

				        /**
				         * Converts a Latin1 string to a word array.
				         *
				         * @param {string} latin1Str The Latin1 string.
				         *
				         * @return {WordArray} The word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
				         */
				        parse: function (latin1Str) {
				            // Shortcut
				            var latin1StrLength = latin1Str.length;

				            // Convert
				            var words = [];
				            for (var i = 0; i < latin1StrLength; i++) {
				                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
				            }

				            return new WordArray.init(words, latin1StrLength);
				        }
				    };

				    /**
				     * UTF-8 encoding strategy.
				     */
				    var Utf8 = C_enc.Utf8 = {
				        /**
				         * Converts a word array to a UTF-8 string.
				         *
				         * @param {WordArray} wordArray The word array.
				         *
				         * @return {string} The UTF-8 string.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
				         */
				        stringify: function (wordArray) {
				            try {
				                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
				            } catch (e) {
				                throw new Error('Malformed UTF-8 data');
				            }
				        },

				        /**
				         * Converts a UTF-8 string to a word array.
				         *
				         * @param {string} utf8Str The UTF-8 string.
				         *
				         * @return {WordArray} The word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
				         */
				        parse: function (utf8Str) {
				            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
				        }
				    };

				    /**
				     * Abstract buffered block algorithm template.
				     *
				     * The property blockSize must be implemented in a concrete subtype.
				     *
				     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
				     */
				    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
				        /**
				         * Resets this block algorithm's data buffer to its initial state.
				         *
				         * @example
				         *
				         *     bufferedBlockAlgorithm.reset();
				         */
				        reset: function () {
				            // Initial values
				            this._data = new WordArray.init();
				            this._nDataBytes = 0;
				        },

				        /**
				         * Adds new data to this block algorithm's buffer.
				         *
				         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
				         *
				         * @example
				         *
				         *     bufferedBlockAlgorithm._append('data');
				         *     bufferedBlockAlgorithm._append(wordArray);
				         */
				        _append: function (data) {
				            // Convert string to WordArray, else assume WordArray already
				            if (typeof data == 'string') {
				                data = Utf8.parse(data);
				            }

				            // Append
				            this._data.concat(data);
				            this._nDataBytes += data.sigBytes;
				        },

				        /**
				         * Processes available data blocks.
				         *
				         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
				         *
				         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
				         *
				         * @return {WordArray} The processed data.
				         *
				         * @example
				         *
				         *     var processedData = bufferedBlockAlgorithm._process();
				         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
				         */
				        _process: function (doFlush) {
				            var processedWords;

				            // Shortcuts
				            var data = this._data;
				            var dataWords = data.words;
				            var dataSigBytes = data.sigBytes;
				            var blockSize = this.blockSize;
				            var blockSizeBytes = blockSize * 4;

				            // Count blocks ready
				            var nBlocksReady = dataSigBytes / blockSizeBytes;
				            if (doFlush) {
				                // Round up to include partial blocks
				                nBlocksReady = Math.ceil(nBlocksReady);
				            } else {
				                // Round down to include only full blocks,
				                // less the number of blocks that must remain in the buffer
				                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
				            }

				            // Count words ready
				            var nWordsReady = nBlocksReady * blockSize;

				            // Count bytes ready
				            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

				            // Process blocks
				            if (nWordsReady) {
				                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
				                    // Perform concrete-algorithm logic
				                    this._doProcessBlock(dataWords, offset);
				                }

				                // Remove processed words
				                processedWords = dataWords.splice(0, nWordsReady);
				                data.sigBytes -= nBytesReady;
				            }

				            // Return processed words
				            return new WordArray.init(processedWords, nBytesReady);
				        },

				        /**
				         * Creates a copy of this object.
				         *
				         * @return {Object} The clone.
				         *
				         * @example
				         *
				         *     var clone = bufferedBlockAlgorithm.clone();
				         */
				        clone: function () {
				            var clone = Base.clone.call(this);
				            clone._data = this._data.clone();

				            return clone;
				        },

				        _minBufferSize: 0
				    });

				    /**
				     * Abstract hasher template.
				     *
				     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
				     */
				    C_lib.Hasher = BufferedBlockAlgorithm.extend({
				        /**
				         * Configuration options.
				         */
				        cfg: Base.extend(),

				        /**
				         * Initializes a newly created hasher.
				         *
				         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
				         *
				         * @example
				         *
				         *     var hasher = CryptoJS.algo.SHA256.create();
				         */
				        init: function (cfg) {
				            // Apply config defaults
				            this.cfg = this.cfg.extend(cfg);

				            // Set initial values
				            this.reset();
				        },

				        /**
				         * Resets this hasher to its initial state.
				         *
				         * @example
				         *
				         *     hasher.reset();
				         */
				        reset: function () {
				            // Reset data buffer
				            BufferedBlockAlgorithm.reset.call(this);

				            // Perform concrete-hasher logic
				            this._doReset();
				        },

				        /**
				         * Updates this hasher with a message.
				         *
				         * @param {WordArray|string} messageUpdate The message to append.
				         *
				         * @return {Hasher} This hasher.
				         *
				         * @example
				         *
				         *     hasher.update('message');
				         *     hasher.update(wordArray);
				         */
				        update: function (messageUpdate) {
				            // Append
				            this._append(messageUpdate);

				            // Update the hash
				            this._process();

				            // Chainable
				            return this;
				        },

				        /**
				         * Finalizes the hash computation.
				         * Note that the finalize operation is effectively a destructive, read-once operation.
				         *
				         * @param {WordArray|string} messageUpdate (Optional) A final message update.
				         *
				         * @return {WordArray} The hash.
				         *
				         * @example
				         *
				         *     var hash = hasher.finalize();
				         *     var hash = hasher.finalize('message');
				         *     var hash = hasher.finalize(wordArray);
				         */
				        finalize: function (messageUpdate) {
				            // Final message update
				            if (messageUpdate) {
				                this._append(messageUpdate);
				            }

				            // Perform concrete-hasher logic
				            var hash = this._doFinalize();

				            return hash;
				        },

				        blockSize: 512/32,

				        /**
				         * Creates a shortcut function to a hasher's object interface.
				         *
				         * @param {Hasher} hasher The hasher to create a helper for.
				         *
				         * @return {Function} The shortcut function.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
				         */
				        _createHelper: function (hasher) {
				            return function (message, cfg) {
				                return new hasher.init(cfg).finalize(message);
				            };
				        },

				        /**
				         * Creates a shortcut function to the HMAC's object interface.
				         *
				         * @param {Hasher} hasher The hasher to use in this HMAC helper.
				         *
				         * @return {Function} The shortcut function.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
				         */
				        _createHmacHelper: function (hasher) {
				            return function (message, key) {
				                return new C_algo.HMAC.init(hasher, key).finalize(message);
				            };
				        }
				    });

				    /**
				     * Algorithm namespace.
				     */
				    var C_algo = C.algo = {};

				    return C;
				}(Math));


				return CryptoJS;

			}));
	} (core));
		return core.exports;
	}

	var sha256 = {exports: {}};

	var hasRequiredSha256;

	function requireSha256 () {
		if (hasRequiredSha256) return sha256.exports;
		hasRequiredSha256 = 1;
		(function (module, exports) {
	(function (root, factory) {
				{
					// CommonJS
					module.exports = factory(requireCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function (Math) {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var WordArray = C_lib.WordArray;
				    var Hasher = C_lib.Hasher;
				    var C_algo = C.algo;

				    // Initialization and round constants tables
				    var H = [];
				    var K = [];

				    // Compute constants
				    (function () {
				        function isPrime(n) {
				            var sqrtN = Math.sqrt(n);
				            for (var factor = 2; factor <= sqrtN; factor++) {
				                if (!(n % factor)) {
				                    return false;
				                }
				            }

				            return true;
				        }

				        function getFractionalBits(n) {
				            return ((n - (n | 0)) * 0x100000000) | 0;
				        }

				        var n = 2;
				        var nPrime = 0;
				        while (nPrime < 64) {
				            if (isPrime(n)) {
				                if (nPrime < 8) {
				                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
				                }
				                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

				                nPrime++;
				            }

				            n++;
				        }
				    }());

				    // Reusable object
				    var W = [];

				    /**
				     * SHA-256 hash algorithm.
				     */
				    var SHA256 = C_algo.SHA256 = Hasher.extend({
				        _doReset: function () {
				            this._hash = new WordArray.init(H.slice(0));
				        },

				        _doProcessBlock: function (M, offset) {
				            // Shortcut
				            var H = this._hash.words;

				            // Working variables
				            var a = H[0];
				            var b = H[1];
				            var c = H[2];
				            var d = H[3];
				            var e = H[4];
				            var f = H[5];
				            var g = H[6];
				            var h = H[7];

				            // Computation
				            for (var i = 0; i < 64; i++) {
				                if (i < 16) {
				                    W[i] = M[offset + i] | 0;
				                } else {
				                    var gamma0x = W[i - 15];
				                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
				                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
				                                   (gamma0x >>> 3);

				                    var gamma1x = W[i - 2];
				                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
				                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
				                                   (gamma1x >>> 10);

				                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
				                }

				                var ch  = (e & f) ^ (~e & g);
				                var maj = (a & b) ^ (a & c) ^ (b & c);

				                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
				                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

				                var t1 = h + sigma1 + ch + K[i] + W[i];
				                var t2 = sigma0 + maj;

				                h = g;
				                g = f;
				                f = e;
				                e = (d + t1) | 0;
				                d = c;
				                c = b;
				                b = a;
				                a = (t1 + t2) | 0;
				            }

				            // Intermediate hash value
				            H[0] = (H[0] + a) | 0;
				            H[1] = (H[1] + b) | 0;
				            H[2] = (H[2] + c) | 0;
				            H[3] = (H[3] + d) | 0;
				            H[4] = (H[4] + e) | 0;
				            H[5] = (H[5] + f) | 0;
				            H[6] = (H[6] + g) | 0;
				            H[7] = (H[7] + h) | 0;
				        },

				        _doFinalize: function () {
				            // Shortcuts
				            var data = this._data;
				            var dataWords = data.words;

				            var nBitsTotal = this._nDataBytes * 8;
				            var nBitsLeft = data.sigBytes * 8;

				            // Add padding
				            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
				            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
				            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
				            data.sigBytes = dataWords.length * 4;

				            // Hash final blocks
				            this._process();

				            // Return final computed hash
				            return this._hash;
				        },

				        clone: function () {
				            var clone = Hasher.clone.call(this);
				            clone._hash = this._hash.clone();

				            return clone;
				        }
				    });

				    /**
				     * Shortcut function to the hasher's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     *
				     * @return {WordArray} The hash.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hash = CryptoJS.SHA256('message');
				     *     var hash = CryptoJS.SHA256(wordArray);
				     */
				    C.SHA256 = Hasher._createHelper(SHA256);

				    /**
				     * Shortcut function to the HMAC's object interface.
				     *
				     * @param {WordArray|string} message The message to hash.
				     * @param {WordArray|string} key The secret key.
				     *
				     * @return {WordArray} The HMAC.
				     *
				     * @static
				     *
				     * @example
				     *
				     *     var hmac = CryptoJS.HmacSHA256(message, key);
				     */
				    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
				}(Math));


				return CryptoJS.SHA256;

			}));
	} (sha256));
		return sha256.exports;
	}

	var hmac = {exports: {}};

	var hasRequiredHmac;

	function requireHmac () {
		if (hasRequiredHmac) return hmac.exports;
		hasRequiredHmac = 1;
		(function (module, exports) {
	(function (root, factory) {
				{
					// CommonJS
					module.exports = factory(requireCore());
				}
			}(commonjsGlobal, function (CryptoJS) {

				(function () {
				    // Shortcuts
				    var C = CryptoJS;
				    var C_lib = C.lib;
				    var Base = C_lib.Base;
				    var C_enc = C.enc;
				    var Utf8 = C_enc.Utf8;
				    var C_algo = C.algo;

				    /**
				     * HMAC algorithm.
				     */
				    C_algo.HMAC = Base.extend({
				        /**
				         * Initializes a newly created HMAC.
				         *
				         * @param {Hasher} hasher The hash algorithm to use.
				         * @param {WordArray|string} key The secret key.
				         *
				         * @example
				         *
				         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
				         */
				        init: function (hasher, key) {
				            // Init hasher
				            hasher = this._hasher = new hasher.init();

				            // Convert string to WordArray, else assume WordArray already
				            if (typeof key == 'string') {
				                key = Utf8.parse(key);
				            }

				            // Shortcuts
				            var hasherBlockSize = hasher.blockSize;
				            var hasherBlockSizeBytes = hasherBlockSize * 4;

				            // Allow arbitrary length keys
				            if (key.sigBytes > hasherBlockSizeBytes) {
				                key = hasher.finalize(key);
				            }

				            // Clamp excess bits
				            key.clamp();

				            // Clone key for inner and outer pads
				            var oKey = this._oKey = key.clone();
				            var iKey = this._iKey = key.clone();

				            // Shortcuts
				            var oKeyWords = oKey.words;
				            var iKeyWords = iKey.words;

				            // XOR keys with pad constants
				            for (var i = 0; i < hasherBlockSize; i++) {
				                oKeyWords[i] ^= 0x5c5c5c5c;
				                iKeyWords[i] ^= 0x36363636;
				            }
				            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

				            // Set initial values
				            this.reset();
				        },

				        /**
				         * Resets this HMAC to its initial state.
				         *
				         * @example
				         *
				         *     hmacHasher.reset();
				         */
				        reset: function () {
				            // Shortcut
				            var hasher = this._hasher;

				            // Reset
				            hasher.reset();
				            hasher.update(this._iKey);
				        },

				        /**
				         * Updates this HMAC with a message.
				         *
				         * @param {WordArray|string} messageUpdate The message to append.
				         *
				         * @return {HMAC} This HMAC instance.
				         *
				         * @example
				         *
				         *     hmacHasher.update('message');
				         *     hmacHasher.update(wordArray);
				         */
				        update: function (messageUpdate) {
				            this._hasher.update(messageUpdate);

				            // Chainable
				            return this;
				        },

				        /**
				         * Finalizes the HMAC computation.
				         * Note that the finalize operation is effectively a destructive, read-once operation.
				         *
				         * @param {WordArray|string} messageUpdate (Optional) A final message update.
				         *
				         * @return {WordArray} The HMAC.
				         *
				         * @example
				         *
				         *     var hmac = hmacHasher.finalize();
				         *     var hmac = hmacHasher.finalize('message');
				         *     var hmac = hmacHasher.finalize(wordArray);
				         */
				        finalize: function (messageUpdate) {
				            // Shortcut
				            var hasher = this._hasher;

				            // Compute HMAC
				            var innerHash = hasher.finalize(messageUpdate);
				            hasher.reset();
				            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

				            return hmac;
				        }
				    });
				}());


			}));
	} (hmac));
		return hmac.exports;
	}

	(function (module, exports) {
	(function (root, factory, undef) {
			{
				// CommonJS
				module.exports = factory(requireCore(), requireSha256(), requireHmac());
			}
		}(commonjsGlobal, function (CryptoJS) {

			return CryptoJS.HmacSHA256;

		}));
	} (hmacSha256));

	var HmacSHA256 = hmacSha256.exports;

	var encBase64 = {exports: {}};

	(function (module, exports) {
	(function (root, factory) {
			{
				// CommonJS
				module.exports = factory(requireCore());
			}
		}(commonjsGlobal, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var WordArray = C_lib.WordArray;
			    var C_enc = C.enc;

			    /**
			     * Base64 encoding strategy.
			     */
			    C_enc.Base64 = {
			        /**
			         * Converts a word array to a Base64 string.
			         *
			         * @param {WordArray} wordArray The word array.
			         *
			         * @return {string} The Base64 string.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
			         */
			        stringify: function (wordArray) {
			            // Shortcuts
			            var words = wordArray.words;
			            var sigBytes = wordArray.sigBytes;
			            var map = this._map;

			            // Clamp excess bits
			            wordArray.clamp();

			            // Convert
			            var base64Chars = [];
			            for (var i = 0; i < sigBytes; i += 3) {
			                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
			                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
			                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

			                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

			                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
			                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
			                }
			            }

			            // Add padding
			            var paddingChar = map.charAt(64);
			            if (paddingChar) {
			                while (base64Chars.length % 4) {
			                    base64Chars.push(paddingChar);
			                }
			            }

			            return base64Chars.join('');
			        },

			        /**
			         * Converts a Base64 string to a word array.
			         *
			         * @param {string} base64Str The Base64 string.
			         *
			         * @return {WordArray} The word array.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
			         */
			        parse: function (base64Str) {
			            // Shortcuts
			            var base64StrLength = base64Str.length;
			            var map = this._map;
			            var reverseMap = this._reverseMap;

			            if (!reverseMap) {
			                    reverseMap = this._reverseMap = [];
			                    for (var j = 0; j < map.length; j++) {
			                        reverseMap[map.charCodeAt(j)] = j;
			                    }
			            }

			            // Ignore padding
			            var paddingChar = map.charAt(64);
			            if (paddingChar) {
			                var paddingIndex = base64Str.indexOf(paddingChar);
			                if (paddingIndex !== -1) {
			                    base64StrLength = paddingIndex;
			                }
			            }

			            // Convert
			            return parseLoop(base64Str, base64StrLength, reverseMap);

			        },

			        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
			    };

			    function parseLoop(base64Str, base64StrLength, reverseMap) {
			      var words = [];
			      var nBytes = 0;
			      for (var i = 0; i < base64StrLength; i++) {
			          if (i % 4) {
			              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
			              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
			              var bitsCombined = bits1 | bits2;
			              words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
			              nBytes++;
			          }
			      }
			      return WordArray.create(words, nBytes);
			    }
			}());


			return CryptoJS.enc.Base64;

		}));
	} (encBase64));

	var Base64 = encBase64.exports;

	var axios$2 = {exports: {}};

	var axios$1 = {exports: {}};

	var bind$2 = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};

	var bind$1 = bind$2;

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is a Buffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Buffer, otherwise false
	 */
	function isBuffer(val) {
	  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
	    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a plain Object
	 *
	 * @param {Object} val The value to test
	 * @return {boolean} True if value is a plain Object, otherwise false
	 */
	function isPlainObject(val) {
	  if (toString.call(val) !== '[object Object]') {
	    return false;
	  }

	  var prototype = Object.getPrototypeOf(val);
	  return prototype === null || prototype === Object.prototype;
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 * nativescript
	 *  navigator.product -> 'NativeScript' or 'NS'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
	                                           navigator.product === 'NativeScript' ||
	                                           navigator.product === 'NS')) {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object') {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (isPlainObject(result[key]) && isPlainObject(val)) {
	      result[key] = merge(result[key], val);
	    } else if (isPlainObject(val)) {
	      result[key] = merge({}, val);
	    } else if (isArray(val)) {
	      result[key] = val.slice();
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind$1(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	/**
	 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
	 *
	 * @param {string} content with BOM
	 * @return {string} content value without BOM
	 */
	function stripBOM(content) {
	  if (content.charCodeAt(0) === 0xFEFF) {
	    content = content.slice(1);
	  }
	  return content;
	}

	var utils$8 = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isPlainObject: isPlainObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim,
	  stripBOM: stripBOM
	};

	var utils$7 = utils$8;

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	var buildURL$1 = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils$7.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils$7.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils$7.isArray(val)) {
	        key = key + '[]';
	      } else {
	        val = [val];
	      }

	      utils$7.forEach(val, function parseValue(v) {
	        if (utils$7.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils$7.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    var hashmarkIndex = url.indexOf('#');
	    if (hashmarkIndex !== -1) {
	      url = url.slice(0, hashmarkIndex);
	    }

	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};

	var utils$6 = utils$8;

	function InterceptorManager$1() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected,
	    synchronous: options ? options.synchronous : false,
	    runWhen: options ? options.runWhen : null
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager$1.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager$1.prototype.forEach = function forEach(fn) {
	  utils$6.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	var InterceptorManager_1 = InterceptorManager$1;

	var utils$5 = utils$8;

	var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
	  utils$5.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	var enhanceError = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }

	  error.request = request;
	  error.response = response;
	  error.isAxiosError = true;

	  error.toJSON = function toJSON() {
	    return {
	      // Standard
	      message: this.message,
	      name: this.name,
	      // Microsoft
	      description: this.description,
	      number: this.number,
	      // Mozilla
	      fileName: this.fileName,
	      lineNumber: this.lineNumber,
	      columnNumber: this.columnNumber,
	      stack: this.stack,
	      // Axios
	      config: this.config,
	      code: this.code,
	      status: this.response && this.response.status ? this.response.status : null
	    };
	  };
	  return error;
	};

	var createError;
	var hasRequiredCreateError;

	function requireCreateError () {
		if (hasRequiredCreateError) return createError;
		hasRequiredCreateError = 1;

		var enhanceError$1 = enhanceError;

		/**
		 * Create an Error with the specified message, config, error code, request and response.
		 *
		 * @param {string} message The error message.
		 * @param {Object} config The config.
		 * @param {string} [code] The error code (for example, 'ECONNABORTED').
		 * @param {Object} [request] The request.
		 * @param {Object} [response] The response.
		 * @returns {Error} The created error.
		 */
		createError = function createError(message, config, code, request, response) {
		  var error = new Error(message);
		  return enhanceError$1(error, config, code, request, response);
		};
		return createError;
	}

	var settle;
	var hasRequiredSettle;

	function requireSettle () {
		if (hasRequiredSettle) return settle;
		hasRequiredSettle = 1;

		var createError = requireCreateError();

		/**
		 * Resolve or reject a Promise based on response status.
		 *
		 * @param {Function} resolve A function that resolves the promise.
		 * @param {Function} reject A function that rejects the promise.
		 * @param {object} response The response.
		 */
		settle = function settle(resolve, reject, response) {
		  var validateStatus = response.config.validateStatus;
		  if (!response.status || !validateStatus || validateStatus(response.status)) {
		    resolve(response);
		  } else {
		    reject(createError(
		      'Request failed with status code ' + response.status,
		      response.config,
		      null,
		      response.request,
		      response
		    ));
		  }
		};
		return settle;
	}

	var cookies;
	var hasRequiredCookies;

	function requireCookies () {
		if (hasRequiredCookies) return cookies;
		hasRequiredCookies = 1;

		var utils = utils$8;

		cookies = (
		  utils.isStandardBrowserEnv() ?

		  // Standard browser envs support document.cookie
		    (function standardBrowserEnv() {
		      return {
		        write: function write(name, value, expires, path, domain, secure) {
		          var cookie = [];
		          cookie.push(name + '=' + encodeURIComponent(value));

		          if (utils.isNumber(expires)) {
		            cookie.push('expires=' + new Date(expires).toGMTString());
		          }

		          if (utils.isString(path)) {
		            cookie.push('path=' + path);
		          }

		          if (utils.isString(domain)) {
		            cookie.push('domain=' + domain);
		          }

		          if (secure === true) {
		            cookie.push('secure');
		          }

		          document.cookie = cookie.join('; ');
		        },

		        read: function read(name) {
		          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
		          return (match ? decodeURIComponent(match[3]) : null);
		        },

		        remove: function remove(name) {
		          this.write(name, '', Date.now() - 86400000);
		        }
		      };
		    })() :

		  // Non standard browser env (web workers, react-native) lack needed support.
		    (function nonStandardBrowserEnv() {
		      return {
		        write: function write() {},
		        read: function read() { return null; },
		        remove: function remove() {}
		      };
		    })()
		);
		return cookies;
	}

	var isAbsoluteURL;
	var hasRequiredIsAbsoluteURL;

	function requireIsAbsoluteURL () {
		if (hasRequiredIsAbsoluteURL) return isAbsoluteURL;
		hasRequiredIsAbsoluteURL = 1;

		/**
		 * Determines whether the specified URL is absolute
		 *
		 * @param {string} url The URL to test
		 * @returns {boolean} True if the specified URL is absolute, otherwise false
		 */
		isAbsoluteURL = function isAbsoluteURL(url) {
		  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
		  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
		  // by any combination of letters, digits, plus, period, or hyphen.
		  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
		};
		return isAbsoluteURL;
	}

	var combineURLs;
	var hasRequiredCombineURLs;

	function requireCombineURLs () {
		if (hasRequiredCombineURLs) return combineURLs;
		hasRequiredCombineURLs = 1;

		/**
		 * Creates a new URL by combining the specified URLs
		 *
		 * @param {string} baseURL The base URL
		 * @param {string} relativeURL The relative URL
		 * @returns {string} The combined URL
		 */
		combineURLs = function combineURLs(baseURL, relativeURL) {
		  return relativeURL
		    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
		    : baseURL;
		};
		return combineURLs;
	}

	var buildFullPath;
	var hasRequiredBuildFullPath;

	function requireBuildFullPath () {
		if (hasRequiredBuildFullPath) return buildFullPath;
		hasRequiredBuildFullPath = 1;

		var isAbsoluteURL = requireIsAbsoluteURL();
		var combineURLs = requireCombineURLs();

		/**
		 * Creates a new URL by combining the baseURL with the requestedURL,
		 * only when the requestedURL is not already an absolute URL.
		 * If the requestURL is absolute, this function returns the requestedURL untouched.
		 *
		 * @param {string} baseURL The base URL
		 * @param {string} requestedURL Absolute or relative URL to combine
		 * @returns {string} The combined full path
		 */
		buildFullPath = function buildFullPath(baseURL, requestedURL) {
		  if (baseURL && !isAbsoluteURL(requestedURL)) {
		    return combineURLs(baseURL, requestedURL);
		  }
		  return requestedURL;
		};
		return buildFullPath;
	}

	var parseHeaders;
	var hasRequiredParseHeaders;

	function requireParseHeaders () {
		if (hasRequiredParseHeaders) return parseHeaders;
		hasRequiredParseHeaders = 1;

		var utils = utils$8;

		// Headers whose duplicates are ignored by node
		// c.f. https://nodejs.org/api/http.html#http_message_headers
		var ignoreDuplicateOf = [
		  'age', 'authorization', 'content-length', 'content-type', 'etag',
		  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
		  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
		  'referer', 'retry-after', 'user-agent'
		];

		/**
		 * Parse headers into an object
		 *
		 * ```
		 * Date: Wed, 27 Aug 2014 08:58:49 GMT
		 * Content-Type: application/json
		 * Connection: keep-alive
		 * Transfer-Encoding: chunked
		 * ```
		 *
		 * @param {String} headers Headers needing to be parsed
		 * @returns {Object} Headers parsed into an object
		 */
		parseHeaders = function parseHeaders(headers) {
		  var parsed = {};
		  var key;
		  var val;
		  var i;

		  if (!headers) { return parsed; }

		  utils.forEach(headers.split('\n'), function parser(line) {
		    i = line.indexOf(':');
		    key = utils.trim(line.substr(0, i)).toLowerCase();
		    val = utils.trim(line.substr(i + 1));

		    if (key) {
		      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
		        return;
		      }
		      if (key === 'set-cookie') {
		        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
		      } else {
		        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
		      }
		    }
		  });

		  return parsed;
		};
		return parseHeaders;
	}

	var isURLSameOrigin;
	var hasRequiredIsURLSameOrigin;

	function requireIsURLSameOrigin () {
		if (hasRequiredIsURLSameOrigin) return isURLSameOrigin;
		hasRequiredIsURLSameOrigin = 1;

		var utils = utils$8;

		isURLSameOrigin = (
		  utils.isStandardBrowserEnv() ?

		  // Standard browser envs have full support of the APIs needed to test
		  // whether the request URL is of the same origin as current location.
		    (function standardBrowserEnv() {
		      var msie = /(msie|trident)/i.test(navigator.userAgent);
		      var urlParsingNode = document.createElement('a');
		      var originURL;

		      /**
		    * Parse a URL to discover it's components
		    *
		    * @param {String} url The URL to be parsed
		    * @returns {Object}
		    */
		      function resolveURL(url) {
		        var href = url;

		        if (msie) {
		        // IE needs attribute set twice to normalize properties
		          urlParsingNode.setAttribute('href', href);
		          href = urlParsingNode.href;
		        }

		        urlParsingNode.setAttribute('href', href);

		        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
		        return {
		          href: urlParsingNode.href,
		          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
		          host: urlParsingNode.host,
		          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
		          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
		          hostname: urlParsingNode.hostname,
		          port: urlParsingNode.port,
		          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
		            urlParsingNode.pathname :
		            '/' + urlParsingNode.pathname
		        };
		      }

		      originURL = resolveURL(window.location.href);

		      /**
		    * Determine if a URL shares the same origin as the current location
		    *
		    * @param {String} requestURL The URL to test
		    * @returns {boolean} True if URL shares the same origin, otherwise false
		    */
		      return function isURLSameOrigin(requestURL) {
		        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
		        return (parsed.protocol === originURL.protocol &&
		            parsed.host === originURL.host);
		      };
		    })() :

		  // Non standard browser envs (web workers, react-native) lack needed support.
		    (function nonStandardBrowserEnv() {
		      return function isURLSameOrigin() {
		        return true;
		      };
		    })()
		);
		return isURLSameOrigin;
	}

	var Cancel_1;
	var hasRequiredCancel;

	function requireCancel () {
		if (hasRequiredCancel) return Cancel_1;
		hasRequiredCancel = 1;

		/**
		 * A `Cancel` is an object that is thrown when an operation is canceled.
		 *
		 * @class
		 * @param {string=} message The message.
		 */
		function Cancel(message) {
		  this.message = message;
		}

		Cancel.prototype.toString = function toString() {
		  return 'Cancel' + (this.message ? ': ' + this.message : '');
		};

		Cancel.prototype.__CANCEL__ = true;

		Cancel_1 = Cancel;
		return Cancel_1;
	}

	var xhr;
	var hasRequiredXhr;

	function requireXhr () {
		if (hasRequiredXhr) return xhr;
		hasRequiredXhr = 1;

		var utils = utils$8;
		var settle = requireSettle();
		var cookies = requireCookies();
		var buildURL = buildURL$1;
		var buildFullPath = requireBuildFullPath();
		var parseHeaders = requireParseHeaders();
		var isURLSameOrigin = requireIsURLSameOrigin();
		var createError = requireCreateError();
		var defaults = requireDefaults();
		var Cancel = requireCancel();

		xhr = function xhrAdapter(config) {
		  return new Promise(function dispatchXhrRequest(resolve, reject) {
		    var requestData = config.data;
		    var requestHeaders = config.headers;
		    var responseType = config.responseType;
		    var onCanceled;
		    function done() {
		      if (config.cancelToken) {
		        config.cancelToken.unsubscribe(onCanceled);
		      }

		      if (config.signal) {
		        config.signal.removeEventListener('abort', onCanceled);
		      }
		    }

		    if (utils.isFormData(requestData)) {
		      delete requestHeaders['Content-Type']; // Let the browser set it
		    }

		    var request = new XMLHttpRequest();

		    // HTTP basic authentication
		    if (config.auth) {
		      var username = config.auth.username || '';
		      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
		      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
		    }

		    var fullPath = buildFullPath(config.baseURL, config.url);
		    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

		    // Set the request timeout in MS
		    request.timeout = config.timeout;

		    function onloadend() {
		      if (!request) {
		        return;
		      }
		      // Prepare the response
		      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
		      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
		        request.responseText : request.response;
		      var response = {
		        data: responseData,
		        status: request.status,
		        statusText: request.statusText,
		        headers: responseHeaders,
		        config: config,
		        request: request
		      };

		      settle(function _resolve(value) {
		        resolve(value);
		        done();
		      }, function _reject(err) {
		        reject(err);
		        done();
		      }, response);

		      // Clean up request
		      request = null;
		    }

		    if ('onloadend' in request) {
		      // Use onloadend if available
		      request.onloadend = onloadend;
		    } else {
		      // Listen for ready state to emulate onloadend
		      request.onreadystatechange = function handleLoad() {
		        if (!request || request.readyState !== 4) {
		          return;
		        }

		        // The request errored out and we didn't get a response, this will be
		        // handled by onerror instead
		        // With one exception: request that using file: protocol, most browsers
		        // will return status as 0 even though it's a successful request
		        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
		          return;
		        }
		        // readystate handler is calling before onerror or ontimeout handlers,
		        // so we should call onloadend on the next 'tick'
		        setTimeout(onloadend);
		      };
		    }

		    // Handle browser request cancellation (as opposed to a manual cancellation)
		    request.onabort = function handleAbort() {
		      if (!request) {
		        return;
		      }

		      reject(createError('Request aborted', config, 'ECONNABORTED', request));

		      // Clean up request
		      request = null;
		    };

		    // Handle low level network errors
		    request.onerror = function handleError() {
		      // Real errors are hidden from us by the browser
		      // onerror should only fire if it's a network error
		      reject(createError('Network Error', config, null, request));

		      // Clean up request
		      request = null;
		    };

		    // Handle timeout
		    request.ontimeout = function handleTimeout() {
		      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
		      var transitional = config.transitional || defaults.transitional;
		      if (config.timeoutErrorMessage) {
		        timeoutErrorMessage = config.timeoutErrorMessage;
		      }
		      reject(createError(
		        timeoutErrorMessage,
		        config,
		        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
		        request));

		      // Clean up request
		      request = null;
		    };

		    // Add xsrf header
		    // This is only done if running in a standard browser environment.
		    // Specifically not if we're in a web worker, or react-native.
		    if (utils.isStandardBrowserEnv()) {
		      // Add xsrf header
		      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
		        cookies.read(config.xsrfCookieName) :
		        undefined;

		      if (xsrfValue) {
		        requestHeaders[config.xsrfHeaderName] = xsrfValue;
		      }
		    }

		    // Add headers to the request
		    if ('setRequestHeader' in request) {
		      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
		        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
		          // Remove Content-Type if data is undefined
		          delete requestHeaders[key];
		        } else {
		          // Otherwise add header to the request
		          request.setRequestHeader(key, val);
		        }
		      });
		    }

		    // Add withCredentials to request if needed
		    if (!utils.isUndefined(config.withCredentials)) {
		      request.withCredentials = !!config.withCredentials;
		    }

		    // Add responseType to request if needed
		    if (responseType && responseType !== 'json') {
		      request.responseType = config.responseType;
		    }

		    // Handle progress if needed
		    if (typeof config.onDownloadProgress === 'function') {
		      request.addEventListener('progress', config.onDownloadProgress);
		    }

		    // Not all browsers support upload events
		    if (typeof config.onUploadProgress === 'function' && request.upload) {
		      request.upload.addEventListener('progress', config.onUploadProgress);
		    }

		    if (config.cancelToken || config.signal) {
		      // Handle cancellation
		      // eslint-disable-next-line func-names
		      onCanceled = function(cancel) {
		        if (!request) {
		          return;
		        }
		        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
		        request.abort();
		        request = null;
		      };

		      config.cancelToken && config.cancelToken.subscribe(onCanceled);
		      if (config.signal) {
		        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
		      }
		    }

		    if (!requestData) {
		      requestData = null;
		    }

		    // Send the request
		    request.send(requestData);
		  });
		};
		return xhr;
	}

	var followRedirects = {exports: {}};

	var src = {exports: {}};

	var browser = {exports: {}};

	/**
	 * Helpers.
	 */

	var ms;
	var hasRequiredMs;

	function requireMs () {
		if (hasRequiredMs) return ms;
		hasRequiredMs = 1;
		var s = 1000;
		var m = s * 60;
		var h = m * 60;
		var d = h * 24;
		var w = d * 7;
		var y = d * 365.25;

		/**
		 * Parse or format the given `val`.
		 *
		 * Options:
		 *
		 *  - `long` verbose formatting [false]
		 *
		 * @param {String|Number} val
		 * @param {Object} [options]
		 * @throws {Error} throw an error if val is not a non-empty string or a number
		 * @return {String|Number}
		 * @api public
		 */

		ms = function(val, options) {
		  options = options || {};
		  var type = typeof val;
		  if (type === 'string' && val.length > 0) {
		    return parse(val);
		  } else if (type === 'number' && isFinite(val)) {
		    return options.long ? fmtLong(val) : fmtShort(val);
		  }
		  throw new Error(
		    'val is not a non-empty string or a valid number. val=' +
		      JSON.stringify(val)
		  );
		};

		/**
		 * Parse the given `str` and return milliseconds.
		 *
		 * @param {String} str
		 * @return {Number}
		 * @api private
		 */

		function parse(str) {
		  str = String(str);
		  if (str.length > 100) {
		    return;
		  }
		  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
		    str
		  );
		  if (!match) {
		    return;
		  }
		  var n = parseFloat(match[1]);
		  var type = (match[2] || 'ms').toLowerCase();
		  switch (type) {
		    case 'years':
		    case 'year':
		    case 'yrs':
		    case 'yr':
		    case 'y':
		      return n * y;
		    case 'weeks':
		    case 'week':
		    case 'w':
		      return n * w;
		    case 'days':
		    case 'day':
		    case 'd':
		      return n * d;
		    case 'hours':
		    case 'hour':
		    case 'hrs':
		    case 'hr':
		    case 'h':
		      return n * h;
		    case 'minutes':
		    case 'minute':
		    case 'mins':
		    case 'min':
		    case 'm':
		      return n * m;
		    case 'seconds':
		    case 'second':
		    case 'secs':
		    case 'sec':
		    case 's':
		      return n * s;
		    case 'milliseconds':
		    case 'millisecond':
		    case 'msecs':
		    case 'msec':
		    case 'ms':
		      return n;
		    default:
		      return undefined;
		  }
		}

		/**
		 * Short format for `ms`.
		 *
		 * @param {Number} ms
		 * @return {String}
		 * @api private
		 */

		function fmtShort(ms) {
		  var msAbs = Math.abs(ms);
		  if (msAbs >= d) {
		    return Math.round(ms / d) + 'd';
		  }
		  if (msAbs >= h) {
		    return Math.round(ms / h) + 'h';
		  }
		  if (msAbs >= m) {
		    return Math.round(ms / m) + 'm';
		  }
		  if (msAbs >= s) {
		    return Math.round(ms / s) + 's';
		  }
		  return ms + 'ms';
		}

		/**
		 * Long format for `ms`.
		 *
		 * @param {Number} ms
		 * @return {String}
		 * @api private
		 */

		function fmtLong(ms) {
		  var msAbs = Math.abs(ms);
		  if (msAbs >= d) {
		    return plural(ms, msAbs, d, 'day');
		  }
		  if (msAbs >= h) {
		    return plural(ms, msAbs, h, 'hour');
		  }
		  if (msAbs >= m) {
		    return plural(ms, msAbs, m, 'minute');
		  }
		  if (msAbs >= s) {
		    return plural(ms, msAbs, s, 'second');
		  }
		  return ms + ' ms';
		}

		/**
		 * Pluralization helper.
		 */

		function plural(ms, msAbs, n, name) {
		  var isPlural = msAbs >= n * 1.5;
		  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
		}
		return ms;
	}

	var common;
	var hasRequiredCommon;

	function requireCommon () {
		if (hasRequiredCommon) return common;
		hasRequiredCommon = 1;
		/**
		 * This is the common logic for both the Node.js and web browser
		 * implementations of `debug()`.
		 */

		function setup(env) {
			createDebug.debug = createDebug;
			createDebug.default = createDebug;
			createDebug.coerce = coerce;
			createDebug.disable = disable;
			createDebug.enable = enable;
			createDebug.enabled = enabled;
			createDebug.humanize = requireMs();
			createDebug.destroy = destroy;

			Object.keys(env).forEach(key => {
				createDebug[key] = env[key];
			});

			/**
			* The currently active debug mode names, and names to skip.
			*/

			createDebug.names = [];
			createDebug.skips = [];

			/**
			* Map of special "%n" handling functions, for the debug "format" argument.
			*
			* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
			*/
			createDebug.formatters = {};

			/**
			* Selects a color for a debug namespace
			* @param {String} namespace The namespace string for the debug instance to be colored
			* @return {Number|String} An ANSI color code for the given namespace
			* @api private
			*/
			function selectColor(namespace) {
				let hash = 0;

				for (let i = 0; i < namespace.length; i++) {
					hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
					hash |= 0; // Convert to 32bit integer
				}

				return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
			}
			createDebug.selectColor = selectColor;

			/**
			* Create a debugger with the given `namespace`.
			*
			* @param {String} namespace
			* @return {Function}
			* @api public
			*/
			function createDebug(namespace) {
				let prevTime;
				let enableOverride = null;
				let namespacesCache;
				let enabledCache;

				function debug(...args) {
					// Disabled?
					if (!debug.enabled) {
						return;
					}

					const self = debug;

					// Set `diff` timestamp
					const curr = Number(new Date());
					const ms = curr - (prevTime || curr);
					self.diff = ms;
					self.prev = prevTime;
					self.curr = curr;
					prevTime = curr;

					args[0] = createDebug.coerce(args[0]);

					if (typeof args[0] !== 'string') {
						// Anything else let's inspect with %O
						args.unshift('%O');
					}

					// Apply any `formatters` transformations
					let index = 0;
					args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
						// If we encounter an escaped % then don't increase the array index
						if (match === '%%') {
							return '%';
						}
						index++;
						const formatter = createDebug.formatters[format];
						if (typeof formatter === 'function') {
							const val = args[index];
							match = formatter.call(self, val);

							// Now we need to remove `args[index]` since it's inlined in the `format`
							args.splice(index, 1);
							index--;
						}
						return match;
					});

					// Apply env-specific formatting (colors, etc.)
					createDebug.formatArgs.call(self, args);

					const logFn = self.log || createDebug.log;
					logFn.apply(self, args);
				}

				debug.namespace = namespace;
				debug.useColors = createDebug.useColors();
				debug.color = createDebug.selectColor(namespace);
				debug.extend = extend;
				debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

				Object.defineProperty(debug, 'enabled', {
					enumerable: true,
					configurable: false,
					get: () => {
						if (enableOverride !== null) {
							return enableOverride;
						}
						if (namespacesCache !== createDebug.namespaces) {
							namespacesCache = createDebug.namespaces;
							enabledCache = createDebug.enabled(namespace);
						}

						return enabledCache;
					},
					set: v => {
						enableOverride = v;
					}
				});

				// Env-specific initialization logic for debug instances
				if (typeof createDebug.init === 'function') {
					createDebug.init(debug);
				}

				return debug;
			}

			function extend(namespace, delimiter) {
				const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
				newDebug.log = this.log;
				return newDebug;
			}

			/**
			* Enables a debug mode by namespaces. This can include modes
			* separated by a colon and wildcards.
			*
			* @param {String} namespaces
			* @api public
			*/
			function enable(namespaces) {
				createDebug.save(namespaces);
				createDebug.namespaces = namespaces;

				createDebug.names = [];
				createDebug.skips = [];

				let i;
				const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
				const len = split.length;

				for (i = 0; i < len; i++) {
					if (!split[i]) {
						// ignore empty strings
						continue;
					}

					namespaces = split[i].replace(/\*/g, '.*?');

					if (namespaces[0] === '-') {
						createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
					} else {
						createDebug.names.push(new RegExp('^' + namespaces + '$'));
					}
				}
			}

			/**
			* Disable debug output.
			*
			* @return {String} namespaces
			* @api public
			*/
			function disable() {
				const namespaces = [
					...createDebug.names.map(toNamespace),
					...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
				].join(',');
				createDebug.enable('');
				return namespaces;
			}

			/**
			* Returns true if the given mode name is enabled, false otherwise.
			*
			* @param {String} name
			* @return {Boolean}
			* @api public
			*/
			function enabled(name) {
				if (name[name.length - 1] === '*') {
					return true;
				}

				let i;
				let len;

				for (i = 0, len = createDebug.skips.length; i < len; i++) {
					if (createDebug.skips[i].test(name)) {
						return false;
					}
				}

				for (i = 0, len = createDebug.names.length; i < len; i++) {
					if (createDebug.names[i].test(name)) {
						return true;
					}
				}

				return false;
			}

			/**
			* Convert regexp to namespace
			*
			* @param {RegExp} regxep
			* @return {String} namespace
			* @api private
			*/
			function toNamespace(regexp) {
				return regexp.toString()
					.substring(2, regexp.toString().length - 2)
					.replace(/\.\*\?$/, '*');
			}

			/**
			* Coerce `val`.
			*
			* @param {Mixed} val
			* @return {Mixed}
			* @api private
			*/
			function coerce(val) {
				if (val instanceof Error) {
					return val.stack || val.message;
				}
				return val;
			}

			/**
			* XXX DO NOT USE. This is a temporary stub function.
			* XXX It WILL be removed in the next major release.
			*/
			function destroy() {
				console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
			}

			createDebug.enable(createDebug.load());

			return createDebug;
		}

		common = setup;
		return common;
	}

	/* eslint-env browser */

	var hasRequiredBrowser;

	function requireBrowser () {
		if (hasRequiredBrowser) return browser.exports;
		hasRequiredBrowser = 1;
		(function (module, exports) {
			/**
			 * This is the web browser implementation of `debug()`.
			 */

			exports.formatArgs = formatArgs;
			exports.save = save;
			exports.load = load;
			exports.useColors = useColors;
			exports.storage = localstorage();
			exports.destroy = (() => {
				let warned = false;

				return () => {
					if (!warned) {
						warned = true;
						console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
					}
				};
			})();

			/**
			 * Colors.
			 */

			exports.colors = [
				'#0000CC',
				'#0000FF',
				'#0033CC',
				'#0033FF',
				'#0066CC',
				'#0066FF',
				'#0099CC',
				'#0099FF',
				'#00CC00',
				'#00CC33',
				'#00CC66',
				'#00CC99',
				'#00CCCC',
				'#00CCFF',
				'#3300CC',
				'#3300FF',
				'#3333CC',
				'#3333FF',
				'#3366CC',
				'#3366FF',
				'#3399CC',
				'#3399FF',
				'#33CC00',
				'#33CC33',
				'#33CC66',
				'#33CC99',
				'#33CCCC',
				'#33CCFF',
				'#6600CC',
				'#6600FF',
				'#6633CC',
				'#6633FF',
				'#66CC00',
				'#66CC33',
				'#9900CC',
				'#9900FF',
				'#9933CC',
				'#9933FF',
				'#99CC00',
				'#99CC33',
				'#CC0000',
				'#CC0033',
				'#CC0066',
				'#CC0099',
				'#CC00CC',
				'#CC00FF',
				'#CC3300',
				'#CC3333',
				'#CC3366',
				'#CC3399',
				'#CC33CC',
				'#CC33FF',
				'#CC6600',
				'#CC6633',
				'#CC9900',
				'#CC9933',
				'#CCCC00',
				'#CCCC33',
				'#FF0000',
				'#FF0033',
				'#FF0066',
				'#FF0099',
				'#FF00CC',
				'#FF00FF',
				'#FF3300',
				'#FF3333',
				'#FF3366',
				'#FF3399',
				'#FF33CC',
				'#FF33FF',
				'#FF6600',
				'#FF6633',
				'#FF9900',
				'#FF9933',
				'#FFCC00',
				'#FFCC33'
			];

			/**
			 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
			 * and the Firebug extension (any Firefox version) are known
			 * to support "%c" CSS customizations.
			 *
			 * TODO: add a `localStorage` variable to explicitly enable/disable colors
			 */

			// eslint-disable-next-line complexity
			function useColors() {
				// NB: In an Electron preload script, document will be defined but not fully
				// initialized. Since we know we're in Chrome, we'll just detect this case
				// explicitly
				if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
					return true;
				}

				// Internet Explorer and Edge do not support colors.
				if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
					return false;
				}

				// Is webkit? http://stackoverflow.com/a/16459606/376773
				// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
				return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
					// Is firebug? http://stackoverflow.com/a/398120/376773
					(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
					// Is firefox >= v31?
					// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
					(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
					// Double check webkit in userAgent just in case we are in a worker
					(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
			}

			/**
			 * Colorize log arguments if enabled.
			 *
			 * @api public
			 */

			function formatArgs(args) {
				args[0] = (this.useColors ? '%c' : '') +
					this.namespace +
					(this.useColors ? ' %c' : ' ') +
					args[0] +
					(this.useColors ? '%c ' : ' ') +
					'+' + module.exports.humanize(this.diff);

				if (!this.useColors) {
					return;
				}

				const c = 'color: ' + this.color;
				args.splice(1, 0, c, 'color: inherit');

				// The final "%c" is somewhat tricky, because there could be other
				// arguments passed either before or after the %c, so we need to
				// figure out the correct index to insert the CSS into
				let index = 0;
				let lastC = 0;
				args[0].replace(/%[a-zA-Z%]/g, match => {
					if (match === '%%') {
						return;
					}
					index++;
					if (match === '%c') {
						// We only are interested in the *last* %c
						// (the user may have provided their own)
						lastC = index;
					}
				});

				args.splice(lastC, 0, c);
			}

			/**
			 * Invokes `console.debug()` when available.
			 * No-op when `console.debug` is not a "function".
			 * If `console.debug` is not available, falls back
			 * to `console.log`.
			 *
			 * @api public
			 */
			exports.log = console.debug || console.log || (() => {});

			/**
			 * Save `namespaces`.
			 *
			 * @param {String} namespaces
			 * @api private
			 */
			function save(namespaces) {
				try {
					if (namespaces) {
						exports.storage.setItem('debug', namespaces);
					} else {
						exports.storage.removeItem('debug');
					}
				} catch (error) {
					// Swallow
					// XXX (@Qix-) should we be logging these?
				}
			}

			/**
			 * Load `namespaces`.
			 *
			 * @return {String} returns the previously persisted debug modes
			 * @api private
			 */
			function load() {
				let r;
				try {
					r = exports.storage.getItem('debug');
				} catch (error) {
					// Swallow
					// XXX (@Qix-) should we be logging these?
				}

				// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
				if (!r && typeof process !== 'undefined' && 'env' in process) {
					r = process.env.DEBUG;
				}

				return r;
			}

			/**
			 * Localstorage attempts to return the localstorage.
			 *
			 * This is necessary because safari throws
			 * when a user disables cookies/localstorage
			 * and you attempt to access it.
			 *
			 * @return {LocalStorage}
			 * @api private
			 */

			function localstorage() {
				try {
					// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
					// The Browser also has localStorage in the global context.
					return localStorage;
				} catch (error) {
					// Swallow
					// XXX (@Qix-) should we be logging these?
				}
			}

			module.exports = requireCommon()(exports);

			const {formatters} = module.exports;

			/**
			 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
			 */

			formatters.j = function (v) {
				try {
					return JSON.stringify(v);
				} catch (error) {
					return '[UnexpectedJSONParseError]: ' + error.message;
				}
			};
	} (browser, browser.exports));
		return browser.exports;
	}

	var node = {exports: {}};

	var hasFlag;
	var hasRequiredHasFlag;

	function requireHasFlag () {
		if (hasRequiredHasFlag) return hasFlag;
		hasRequiredHasFlag = 1;
		hasFlag = (flag, argv) => {
			argv = argv || process.argv;
			const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
			const pos = argv.indexOf(prefix + flag);
			const terminatorPos = argv.indexOf('--');
			return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
		};
		return hasFlag;
	}

	var supportsColor_1;
	var hasRequiredSupportsColor;

	function requireSupportsColor () {
		if (hasRequiredSupportsColor) return supportsColor_1;
		hasRequiredSupportsColor = 1;
		const os = require$$0;
		const hasFlag = requireHasFlag();

		const env = process.env;

		let forceColor;
		if (hasFlag('no-color') ||
			hasFlag('no-colors') ||
			hasFlag('color=false')) {
			forceColor = false;
		} else if (hasFlag('color') ||
			hasFlag('colors') ||
			hasFlag('color=true') ||
			hasFlag('color=always')) {
			forceColor = true;
		}
		if ('FORCE_COLOR' in env) {
			forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
		}

		function translateLevel(level) {
			if (level === 0) {
				return false;
			}

			return {
				level,
				hasBasic: true,
				has256: level >= 2,
				has16m: level >= 3
			};
		}

		function supportsColor(stream) {
			if (forceColor === false) {
				return 0;
			}

			if (hasFlag('color=16m') ||
				hasFlag('color=full') ||
				hasFlag('color=truecolor')) {
				return 3;
			}

			if (hasFlag('color=256')) {
				return 2;
			}

			if (stream && !stream.isTTY && forceColor !== true) {
				return 0;
			}

			const min = forceColor ? 1 : 0;

			if (process.platform === 'win32') {
				// Node.js 7.5.0 is the first version of Node.js to include a patch to
				// libuv that enables 256 color output on Windows. Anything earlier and it
				// won't work. However, here we target Node.js 8 at minimum as it is an LTS
				// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
				// release that supports 256 colors. Windows 10 build 14931 is the first release
				// that supports 16m/TrueColor.
				const osRelease = os.release().split('.');
				if (
					Number(process.versions.node.split('.')[0]) >= 8 &&
					Number(osRelease[0]) >= 10 &&
					Number(osRelease[2]) >= 10586
				) {
					return Number(osRelease[2]) >= 14931 ? 3 : 2;
				}

				return 1;
			}

			if ('CI' in env) {
				if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
					return 1;
				}

				return min;
			}

			if ('TEAMCITY_VERSION' in env) {
				return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
			}

			if (env.COLORTERM === 'truecolor') {
				return 3;
			}

			if ('TERM_PROGRAM' in env) {
				const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

				switch (env.TERM_PROGRAM) {
					case 'iTerm.app':
						return version >= 3 ? 3 : 2;
					case 'Apple_Terminal':
						return 2;
					// No default
				}
			}

			if (/-256(color)?$/i.test(env.TERM)) {
				return 2;
			}

			if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
				return 1;
			}

			if ('COLORTERM' in env) {
				return 1;
			}

			if (env.TERM === 'dumb') {
				return min;
			}

			return min;
		}

		function getSupportLevel(stream) {
			const level = supportsColor(stream);
			return translateLevel(level);
		}

		supportsColor_1 = {
			supportsColor: getSupportLevel,
			stdout: getSupportLevel(process.stdout),
			stderr: getSupportLevel(process.stderr)
		};
		return supportsColor_1;
	}

	/**
	 * Module dependencies.
	 */

	var hasRequiredNode;

	function requireNode () {
		if (hasRequiredNode) return node.exports;
		hasRequiredNode = 1;
		(function (module, exports) {
			const tty = require$$0$1;
			const util = require$$1;

			/**
			 * This is the Node.js implementation of `debug()`.
			 */

			exports.init = init;
			exports.log = log;
			exports.formatArgs = formatArgs;
			exports.save = save;
			exports.load = load;
			exports.useColors = useColors;
			exports.destroy = util.deprecate(
				() => {},
				'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
			);

			/**
			 * Colors.
			 */

			exports.colors = [6, 2, 3, 4, 5, 1];

			try {
				// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
				// eslint-disable-next-line import/no-extraneous-dependencies
				const supportsColor = requireSupportsColor();

				if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
					exports.colors = [
						20,
						21,
						26,
						27,
						32,
						33,
						38,
						39,
						40,
						41,
						42,
						43,
						44,
						45,
						56,
						57,
						62,
						63,
						68,
						69,
						74,
						75,
						76,
						77,
						78,
						79,
						80,
						81,
						92,
						93,
						98,
						99,
						112,
						113,
						128,
						129,
						134,
						135,
						148,
						149,
						160,
						161,
						162,
						163,
						164,
						165,
						166,
						167,
						168,
						169,
						170,
						171,
						172,
						173,
						178,
						179,
						184,
						185,
						196,
						197,
						198,
						199,
						200,
						201,
						202,
						203,
						204,
						205,
						206,
						207,
						208,
						209,
						214,
						215,
						220,
						221
					];
				}
			} catch (error) {
				// Swallow - we only care if `supports-color` is available; it doesn't have to be.
			}

			/**
			 * Build up the default `inspectOpts` object from the environment variables.
			 *
			 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
			 */

			exports.inspectOpts = Object.keys(process.env).filter(key => {
				return /^debug_/i.test(key);
			}).reduce((obj, key) => {
				// Camel-case
				const prop = key
					.substring(6)
					.toLowerCase()
					.replace(/_([a-z])/g, (_, k) => {
						return k.toUpperCase();
					});

				// Coerce string value into JS value
				let val = process.env[key];
				if (/^(yes|on|true|enabled)$/i.test(val)) {
					val = true;
				} else if (/^(no|off|false|disabled)$/i.test(val)) {
					val = false;
				} else if (val === 'null') {
					val = null;
				} else {
					val = Number(val);
				}

				obj[prop] = val;
				return obj;
			}, {});

			/**
			 * Is stdout a TTY? Colored output is enabled when `true`.
			 */

			function useColors() {
				return 'colors' in exports.inspectOpts ?
					Boolean(exports.inspectOpts.colors) :
					tty.isatty(process.stderr.fd);
			}

			/**
			 * Adds ANSI color escape codes if enabled.
			 *
			 * @api public
			 */

			function formatArgs(args) {
				const {namespace: name, useColors} = this;

				if (useColors) {
					const c = this.color;
					const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
					const prefix = `  ${colorCode};1m${name} \u001B[0m`;

					args[0] = prefix + args[0].split('\n').join('\n' + prefix);
					args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
				} else {
					args[0] = getDate() + name + ' ' + args[0];
				}
			}

			function getDate() {
				if (exports.inspectOpts.hideDate) {
					return '';
				}
				return new Date().toISOString() + ' ';
			}

			/**
			 * Invokes `util.format()` with the specified arguments and writes to stderr.
			 */

			function log(...args) {
				return process.stderr.write(util.format(...args) + '\n');
			}

			/**
			 * Save `namespaces`.
			 *
			 * @param {String} namespaces
			 * @api private
			 */
			function save(namespaces) {
				if (namespaces) {
					process.env.DEBUG = namespaces;
				} else {
					// If you set a process.env field to null or undefined, it gets cast to the
					// string 'null' or 'undefined'. Just delete instead.
					delete process.env.DEBUG;
				}
			}

			/**
			 * Load `namespaces`.
			 *
			 * @return {String} returns the previously persisted debug modes
			 * @api private
			 */

			function load() {
				return process.env.DEBUG;
			}

			/**
			 * Init logic for `debug` instances.
			 *
			 * Create a new `inspectOpts` object in case `useColors` is set
			 * differently for a particular `debug` instance.
			 */

			function init(debug) {
				debug.inspectOpts = {};

				const keys = Object.keys(exports.inspectOpts);
				for (let i = 0; i < keys.length; i++) {
					debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
				}
			}

			module.exports = requireCommon()(exports);

			const {formatters} = module.exports;

			/**
			 * Map %o to `util.inspect()`, all on a single line.
			 */

			formatters.o = function (v) {
				this.inspectOpts.colors = this.useColors;
				return util.inspect(v, this.inspectOpts)
					.split('\n')
					.map(str => str.trim())
					.join(' ');
			};

			/**
			 * Map %O to `util.inspect()`, allowing multiple lines if needed.
			 */

			formatters.O = function (v) {
				this.inspectOpts.colors = this.useColors;
				return util.inspect(v, this.inspectOpts);
			};
	} (node, node.exports));
		return node.exports;
	}

	/**
	 * Detect Electron renderer / nwjs process, which is node, but we should
	 * treat as a browser.
	 */

	var hasRequiredSrc;

	function requireSrc () {
		if (hasRequiredSrc) return src.exports;
		hasRequiredSrc = 1;
		(function (module) {
			if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
				module.exports = requireBrowser();
			} else {
				module.exports = requireNode();
			}
	} (src));
		return src.exports;
	}

	var debug_1;
	var hasRequiredDebug;

	function requireDebug () {
		if (hasRequiredDebug) return debug_1;
		hasRequiredDebug = 1;
		var debug;

		debug_1 = function () {
		  if (!debug) {
		    try {
		      /* eslint global-require: off */
		      debug = requireSrc()("follow-redirects");
		    }
		    catch (error) { /* */ }
		    if (typeof debug !== "function") {
		      debug = function () { /* */ };
		    }
		  }
		  debug.apply(null, arguments);
		};
		return debug_1;
	}

	var hasRequiredFollowRedirects;

	function requireFollowRedirects () {
		if (hasRequiredFollowRedirects) return followRedirects.exports;
		hasRequiredFollowRedirects = 1;
		var url = require$$0$2;
		var URL = url.URL;
		var http = require$$1$1;
		var https = require$$2;
		var Writable = require$$3.Writable;
		var assert = require$$4;
		var debug = requireDebug();

		// Create handlers that pass events from native requests
		var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
		var eventHandlers = Object.create(null);
		events.forEach(function (event) {
		  eventHandlers[event] = function (arg1, arg2, arg3) {
		    this._redirectable.emit(event, arg1, arg2, arg3);
		  };
		});

		var InvalidUrlError = createErrorType(
		  "ERR_INVALID_URL",
		  "Invalid URL",
		  TypeError
		);
		// Error types with codes
		var RedirectionError = createErrorType(
		  "ERR_FR_REDIRECTION_FAILURE",
		  "Redirected request failed"
		);
		var TooManyRedirectsError = createErrorType(
		  "ERR_FR_TOO_MANY_REDIRECTS",
		  "Maximum number of redirects exceeded"
		);
		var MaxBodyLengthExceededError = createErrorType(
		  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
		  "Request body larger than maxBodyLength limit"
		);
		var WriteAfterEndError = createErrorType(
		  "ERR_STREAM_WRITE_AFTER_END",
		  "write after end"
		);

		// An HTTP(S) request that can be redirected
		function RedirectableRequest(options, responseCallback) {
		  // Initialize the request
		  Writable.call(this);
		  this._sanitizeOptions(options);
		  this._options = options;
		  this._ended = false;
		  this._ending = false;
		  this._redirectCount = 0;
		  this._redirects = [];
		  this._requestBodyLength = 0;
		  this._requestBodyBuffers = [];

		  // Attach a callback if passed
		  if (responseCallback) {
		    this.on("response", responseCallback);
		  }

		  // React to responses of native requests
		  var self = this;
		  this._onNativeResponse = function (response) {
		    self._processResponse(response);
		  };

		  // Perform the first request
		  this._performRequest();
		}
		RedirectableRequest.prototype = Object.create(Writable.prototype);

		RedirectableRequest.prototype.abort = function () {
		  abortRequest(this._currentRequest);
		  this.emit("abort");
		};

		// Writes buffered data to the current native request
		RedirectableRequest.prototype.write = function (data, encoding, callback) {
		  // Writing is not allowed if end has been called
		  if (this._ending) {
		    throw new WriteAfterEndError();
		  }

		  // Validate input and shift parameters if necessary
		  if (!isString(data) && !isBuffer(data)) {
		    throw new TypeError("data should be a string, Buffer or Uint8Array");
		  }
		  if (isFunction(encoding)) {
		    callback = encoding;
		    encoding = null;
		  }

		  // Ignore empty buffers, since writing them doesn't invoke the callback
		  // https://github.com/nodejs/node/issues/22066
		  if (data.length === 0) {
		    if (callback) {
		      callback();
		    }
		    return;
		  }
		  // Only write when we don't exceed the maximum body length
		  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
		    this._requestBodyLength += data.length;
		    this._requestBodyBuffers.push({ data: data, encoding: encoding });
		    this._currentRequest.write(data, encoding, callback);
		  }
		  // Error when we exceed the maximum body length
		  else {
		    this.emit("error", new MaxBodyLengthExceededError());
		    this.abort();
		  }
		};

		// Ends the current native request
		RedirectableRequest.prototype.end = function (data, encoding, callback) {
		  // Shift parameters if necessary
		  if (isFunction(data)) {
		    callback = data;
		    data = encoding = null;
		  }
		  else if (isFunction(encoding)) {
		    callback = encoding;
		    encoding = null;
		  }

		  // Write data if needed and end
		  if (!data) {
		    this._ended = this._ending = true;
		    this._currentRequest.end(null, null, callback);
		  }
		  else {
		    var self = this;
		    var currentRequest = this._currentRequest;
		    this.write(data, encoding, function () {
		      self._ended = true;
		      currentRequest.end(null, null, callback);
		    });
		    this._ending = true;
		  }
		};

		// Sets a header value on the current native request
		RedirectableRequest.prototype.setHeader = function (name, value) {
		  this._options.headers[name] = value;
		  this._currentRequest.setHeader(name, value);
		};

		// Clears a header value on the current native request
		RedirectableRequest.prototype.removeHeader = function (name) {
		  delete this._options.headers[name];
		  this._currentRequest.removeHeader(name);
		};

		// Global timeout for all underlying requests
		RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
		  var self = this;

		  // Destroys the socket on timeout
		  function destroyOnTimeout(socket) {
		    socket.setTimeout(msecs);
		    socket.removeListener("timeout", socket.destroy);
		    socket.addListener("timeout", socket.destroy);
		  }

		  // Sets up a timer to trigger a timeout event
		  function startTimer(socket) {
		    if (self._timeout) {
		      clearTimeout(self._timeout);
		    }
		    self._timeout = setTimeout(function () {
		      self.emit("timeout");
		      clearTimer();
		    }, msecs);
		    destroyOnTimeout(socket);
		  }

		  // Stops a timeout from triggering
		  function clearTimer() {
		    // Clear the timeout
		    if (self._timeout) {
		      clearTimeout(self._timeout);
		      self._timeout = null;
		    }

		    // Clean up all attached listeners
		    self.removeListener("abort", clearTimer);
		    self.removeListener("error", clearTimer);
		    self.removeListener("response", clearTimer);
		    if (callback) {
		      self.removeListener("timeout", callback);
		    }
		    if (!self.socket) {
		      self._currentRequest.removeListener("socket", startTimer);
		    }
		  }

		  // Attach callback if passed
		  if (callback) {
		    this.on("timeout", callback);
		  }

		  // Start the timer if or when the socket is opened
		  if (this.socket) {
		    startTimer(this.socket);
		  }
		  else {
		    this._currentRequest.once("socket", startTimer);
		  }

		  // Clean up on events
		  this.on("socket", destroyOnTimeout);
		  this.on("abort", clearTimer);
		  this.on("error", clearTimer);
		  this.on("response", clearTimer);

		  return this;
		};

		// Proxy all other public ClientRequest methods
		[
		  "flushHeaders", "getHeader",
		  "setNoDelay", "setSocketKeepAlive",
		].forEach(function (method) {
		  RedirectableRequest.prototype[method] = function (a, b) {
		    return this._currentRequest[method](a, b);
		  };
		});

		// Proxy all public ClientRequest properties
		["aborted", "connection", "socket"].forEach(function (property) {
		  Object.defineProperty(RedirectableRequest.prototype, property, {
		    get: function () { return this._currentRequest[property]; },
		  });
		});

		RedirectableRequest.prototype._sanitizeOptions = function (options) {
		  // Ensure headers are always present
		  if (!options.headers) {
		    options.headers = {};
		  }

		  // Since http.request treats host as an alias of hostname,
		  // but the url module interprets host as hostname plus port,
		  // eliminate the host property to avoid confusion.
		  if (options.host) {
		    // Use hostname if set, because it has precedence
		    if (!options.hostname) {
		      options.hostname = options.host;
		    }
		    delete options.host;
		  }

		  // Complete the URL object when necessary
		  if (!options.pathname && options.path) {
		    var searchPos = options.path.indexOf("?");
		    if (searchPos < 0) {
		      options.pathname = options.path;
		    }
		    else {
		      options.pathname = options.path.substring(0, searchPos);
		      options.search = options.path.substring(searchPos);
		    }
		  }
		};


		// Executes the next native request (initial or redirect)
		RedirectableRequest.prototype._performRequest = function () {
		  // Load the native protocol
		  var protocol = this._options.protocol;
		  var nativeProtocol = this._options.nativeProtocols[protocol];
		  if (!nativeProtocol) {
		    this.emit("error", new TypeError("Unsupported protocol " + protocol));
		    return;
		  }

		  // If specified, use the agent corresponding to the protocol
		  // (HTTP and HTTPS use different types of agents)
		  if (this._options.agents) {
		    var scheme = protocol.slice(0, -1);
		    this._options.agent = this._options.agents[scheme];
		  }

		  // Create the native request and set up its event handlers
		  var request = this._currentRequest =
		        nativeProtocol.request(this._options, this._onNativeResponse);
		  request._redirectable = this;
		  for (var event of events) {
		    request.on(event, eventHandlers[event]);
		  }

		  // RFC7230§5.3.1: When making a request directly to an origin server, […]
		  // a client MUST send only the absolute path […] as the request-target.
		  this._currentUrl = /^\//.test(this._options.path) ?
		    url.format(this._options) :
		    // When making a request to a proxy, […]
		    // a client MUST send the target URI in absolute-form […].
		    this._options.path;

		  // End a redirected request
		  // (The first request must be ended explicitly with RedirectableRequest#end)
		  if (this._isRedirect) {
		    // Write the request entity and end
		    var i = 0;
		    var self = this;
		    var buffers = this._requestBodyBuffers;
		    (function writeNext(error) {
		      // Only write if this request has not been redirected yet
		      /* istanbul ignore else */
		      if (request === self._currentRequest) {
		        // Report any write errors
		        /* istanbul ignore if */
		        if (error) {
		          self.emit("error", error);
		        }
		        // Write the next buffer if there are still left
		        else if (i < buffers.length) {
		          var buffer = buffers[i++];
		          /* istanbul ignore else */
		          if (!request.finished) {
		            request.write(buffer.data, buffer.encoding, writeNext);
		          }
		        }
		        // End the request if `end` has been called on us
		        else if (self._ended) {
		          request.end();
		        }
		      }
		    }());
		  }
		};

		// Processes a response from the current native request
		RedirectableRequest.prototype._processResponse = function (response) {
		  // Store the redirected response
		  var statusCode = response.statusCode;
		  if (this._options.trackRedirects) {
		    this._redirects.push({
		      url: this._currentUrl,
		      headers: response.headers,
		      statusCode: statusCode,
		    });
		  }

		  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
		  // that further action needs to be taken by the user agent in order to
		  // fulfill the request. If a Location header field is provided,
		  // the user agent MAY automatically redirect its request to the URI
		  // referenced by the Location field value,
		  // even if the specific status code is not understood.

		  // If the response is not a redirect; return it as-is
		  var location = response.headers.location;
		  if (!location || this._options.followRedirects === false ||
		      statusCode < 300 || statusCode >= 400) {
		    response.responseUrl = this._currentUrl;
		    response.redirects = this._redirects;
		    this.emit("response", response);

		    // Clean up
		    this._requestBodyBuffers = [];
		    return;
		  }

		  // The response is a redirect, so abort the current request
		  abortRequest(this._currentRequest);
		  // Discard the remainder of the response to avoid waiting for data
		  response.destroy();

		  // RFC7231§6.4: A client SHOULD detect and intervene
		  // in cyclical redirections (i.e., "infinite" redirection loops).
		  if (++this._redirectCount > this._options.maxRedirects) {
		    this.emit("error", new TooManyRedirectsError());
		    return;
		  }

		  // Store the request headers if applicable
		  var requestHeaders;
		  var beforeRedirect = this._options.beforeRedirect;
		  if (beforeRedirect) {
		    requestHeaders = Object.assign({
		      // The Host header was set by nativeProtocol.request
		      Host: response.req.getHeader("host"),
		    }, this._options.headers);
		  }

		  // RFC7231§6.4: Automatic redirection needs to done with
		  // care for methods not known to be safe, […]
		  // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
		  // the request method from POST to GET for the subsequent request.
		  var method = this._options.method;
		  if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
		      // RFC7231§6.4.4: The 303 (See Other) status code indicates that
		      // the server is redirecting the user agent to a different resource […]
		      // A user agent can perform a retrieval request targeting that URI
		      // (a GET or HEAD request if using HTTP) […]
		      (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
		    this._options.method = "GET";
		    // Drop a possible entity and headers related to it
		    this._requestBodyBuffers = [];
		    removeMatchingHeaders(/^content-/i, this._options.headers);
		  }

		  // Drop the Host header, as the redirect might lead to a different host
		  var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);

		  // If the redirect is relative, carry over the host of the last request
		  var currentUrlParts = url.parse(this._currentUrl);
		  var currentHost = currentHostHeader || currentUrlParts.host;
		  var currentUrl = /^\w+:/.test(location) ? this._currentUrl :
		    url.format(Object.assign(currentUrlParts, { host: currentHost }));

		  // Determine the URL of the redirection
		  var redirectUrl;
		  try {
		    redirectUrl = url.resolve(currentUrl, location);
		  }
		  catch (cause) {
		    this.emit("error", new RedirectionError({ cause: cause }));
		    return;
		  }

		  // Create the redirected request
		  debug("redirecting to", redirectUrl);
		  this._isRedirect = true;
		  var redirectUrlParts = url.parse(redirectUrl);
		  Object.assign(this._options, redirectUrlParts);

		  // Drop confidential headers when redirecting to a less secure protocol
		  // or to a different domain that is not a superdomain
		  if (redirectUrlParts.protocol !== currentUrlParts.protocol &&
		     redirectUrlParts.protocol !== "https:" ||
		     redirectUrlParts.host !== currentHost &&
		     !isSubdomain(redirectUrlParts.host, currentHost)) {
		    removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
		  }

		  // Evaluate the beforeRedirect callback
		  if (isFunction(beforeRedirect)) {
		    var responseDetails = {
		      headers: response.headers,
		      statusCode: statusCode,
		    };
		    var requestDetails = {
		      url: currentUrl,
		      method: method,
		      headers: requestHeaders,
		    };
		    try {
		      beforeRedirect(this._options, responseDetails, requestDetails);
		    }
		    catch (err) {
		      this.emit("error", err);
		      return;
		    }
		    this._sanitizeOptions(this._options);
		  }

		  // Perform the redirected request
		  try {
		    this._performRequest();
		  }
		  catch (cause) {
		    this.emit("error", new RedirectionError({ cause: cause }));
		  }
		};

		// Wraps the key/value object of protocols with redirect functionality
		function wrap(protocols) {
		  // Default settings
		  var exports = {
		    maxRedirects: 21,
		    maxBodyLength: 10 * 1024 * 1024,
		  };

		  // Wrap each protocol
		  var nativeProtocols = {};
		  Object.keys(protocols).forEach(function (scheme) {
		    var protocol = scheme + ":";
		    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
		    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

		    // Executes a request, following redirects
		    function request(input, options, callback) {
		      // Parse parameters
		      if (isString(input)) {
		        var parsed;
		        try {
		          parsed = urlToOptions(new URL(input));
		        }
		        catch (err) {
		          /* istanbul ignore next */
		          parsed = url.parse(input);
		        }
		        if (!isString(parsed.protocol)) {
		          throw new InvalidUrlError({ input });
		        }
		        input = parsed;
		      }
		      else if (URL && (input instanceof URL)) {
		        input = urlToOptions(input);
		      }
		      else {
		        callback = options;
		        options = input;
		        input = { protocol: protocol };
		      }
		      if (isFunction(options)) {
		        callback = options;
		        options = null;
		      }

		      // Set defaults
		      options = Object.assign({
		        maxRedirects: exports.maxRedirects,
		        maxBodyLength: exports.maxBodyLength,
		      }, input, options);
		      options.nativeProtocols = nativeProtocols;
		      if (!isString(options.host) && !isString(options.hostname)) {
		        options.hostname = "::1";
		      }

		      assert.equal(options.protocol, protocol, "protocol mismatch");
		      debug("options", options);
		      return new RedirectableRequest(options, callback);
		    }

		    // Executes a GET request, following redirects
		    function get(input, options, callback) {
		      var wrappedRequest = wrappedProtocol.request(input, options, callback);
		      wrappedRequest.end();
		      return wrappedRequest;
		    }

		    // Expose the properties on the wrapped protocol
		    Object.defineProperties(wrappedProtocol, {
		      request: { value: request, configurable: true, enumerable: true, writable: true },
		      get: { value: get, configurable: true, enumerable: true, writable: true },
		    });
		  });
		  return exports;
		}

		/* istanbul ignore next */
		function noop() { /* empty */ }

		// from https://github.com/nodejs/node/blob/master/lib/internal/url.js
		function urlToOptions(urlObject) {
		  var options = {
		    protocol: urlObject.protocol,
		    hostname: urlObject.hostname.startsWith("[") ?
		      /* istanbul ignore next */
		      urlObject.hostname.slice(1, -1) :
		      urlObject.hostname,
		    hash: urlObject.hash,
		    search: urlObject.search,
		    pathname: urlObject.pathname,
		    path: urlObject.pathname + urlObject.search,
		    href: urlObject.href,
		  };
		  if (urlObject.port !== "") {
		    options.port = Number(urlObject.port);
		  }
		  return options;
		}

		function removeMatchingHeaders(regex, headers) {
		  var lastValue;
		  for (var header in headers) {
		    if (regex.test(header)) {
		      lastValue = headers[header];
		      delete headers[header];
		    }
		  }
		  return (lastValue === null || typeof lastValue === "undefined") ?
		    undefined : String(lastValue).trim();
		}

		function createErrorType(code, message, baseClass) {
		  // Create constructor
		  function CustomError(properties) {
		    Error.captureStackTrace(this, this.constructor);
		    Object.assign(this, properties || {});
		    this.code = code;
		    this.message = this.cause ? message + ": " + this.cause.message : message;
		  }

		  // Attach constructor and set default properties
		  CustomError.prototype = new (baseClass || Error)();
		  CustomError.prototype.constructor = CustomError;
		  CustomError.prototype.name = "Error [" + code + "]";
		  return CustomError;
		}

		function abortRequest(request) {
		  for (var event of events) {
		    request.removeListener(event, eventHandlers[event]);
		  }
		  request.on("error", noop);
		  request.abort();
		}

		function isSubdomain(subdomain, domain) {
		  assert(isString(subdomain) && isString(domain));
		  var dot = subdomain.length - domain.length - 1;
		  return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
		}

		function isString(value) {
		  return typeof value === "string" || value instanceof String;
		}

		function isFunction(value) {
		  return typeof value === "function";
		}

		function isBuffer(value) {
		  return typeof value === "object" && ("length" in value);
		}

		// Exports
		followRedirects.exports = wrap({ http: http, https: https });
		followRedirects.exports.wrap = wrap;
		return followRedirects.exports;
	}

	var data;
	var hasRequiredData;

	function requireData () {
		if (hasRequiredData) return data;
		hasRequiredData = 1;
		data = {
		  "version": "0.24.0"
		};
		return data;
	}

	var http_1;
	var hasRequiredHttp;

	function requireHttp () {
		if (hasRequiredHttp) return http_1;
		hasRequiredHttp = 1;

		var utils = utils$8;
		var settle = requireSettle();
		var buildFullPath = requireBuildFullPath();
		var buildURL = buildURL$1;
		var http = require$$1$1;
		var https = require$$2;
		var httpFollow = requireFollowRedirects().http;
		var httpsFollow = requireFollowRedirects().https;
		var url = require$$0$2;
		var zlib = require$$8;
		var VERSION = requireData().version;
		var createError = requireCreateError();
		var enhanceError$1 = enhanceError;
		var defaults = requireDefaults();
		var Cancel = requireCancel();

		var isHttps = /https:?/;

		/**
		 *
		 * @param {http.ClientRequestArgs} options
		 * @param {AxiosProxyConfig} proxy
		 * @param {string} location
		 */
		function setProxy(options, proxy, location) {
		  options.hostname = proxy.host;
		  options.host = proxy.host;
		  options.port = proxy.port;
		  options.path = location;

		  // Basic proxy authorization
		  if (proxy.auth) {
		    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
		    options.headers['Proxy-Authorization'] = 'Basic ' + base64;
		  }

		  // If a proxy is used, any redirects must also pass through the proxy
		  options.beforeRedirect = function beforeRedirect(redirection) {
		    redirection.headers.host = redirection.host;
		    setProxy(redirection, proxy, redirection.href);
		  };
		}

		/*eslint consistent-return:0*/
		http_1 = function httpAdapter(config) {
		  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
		    var onCanceled;
		    function done() {
		      if (config.cancelToken) {
		        config.cancelToken.unsubscribe(onCanceled);
		      }

		      if (config.signal) {
		        config.signal.removeEventListener('abort', onCanceled);
		      }
		    }
		    var resolve = function resolve(value) {
		      done();
		      resolvePromise(value);
		    };
		    var reject = function reject(value) {
		      done();
		      rejectPromise(value);
		    };
		    var data = config.data;
		    var headers = config.headers;
		    var headerNames = {};

		    Object.keys(headers).forEach(function storeLowerName(name) {
		      headerNames[name.toLowerCase()] = name;
		    });

		    // Set User-Agent (required by some servers)
		    // See https://github.com/axios/axios/issues/69
		    if ('user-agent' in headerNames) {
		      // User-Agent is specified; handle case where no UA header is desired
		      if (!headers[headerNames['user-agent']]) {
		        delete headers[headerNames['user-agent']];
		      }
		      // Otherwise, use specified value
		    } else {
		      // Only set header if it hasn't been set in config
		      headers['User-Agent'] = 'axios/' + VERSION;
		    }

		    if (data && !utils.isStream(data)) {
		      if (Buffer.isBuffer(data)) ; else if (utils.isArrayBuffer(data)) {
		        data = Buffer.from(new Uint8Array(data));
		      } else if (utils.isString(data)) {
		        data = Buffer.from(data, 'utf-8');
		      } else {
		        return reject(createError(
		          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
		          config
		        ));
		      }

		      // Add Content-Length header if data exists
		      if (!headerNames['content-length']) {
		        headers['Content-Length'] = data.length;
		      }
		    }

		    // HTTP basic authentication
		    var auth = undefined;
		    if (config.auth) {
		      var username = config.auth.username || '';
		      var password = config.auth.password || '';
		      auth = username + ':' + password;
		    }

		    // Parse url
		    var fullPath = buildFullPath(config.baseURL, config.url);
		    var parsed = url.parse(fullPath);
		    var protocol = parsed.protocol || 'http:';

		    if (!auth && parsed.auth) {
		      var urlAuth = parsed.auth.split(':');
		      var urlUsername = urlAuth[0] || '';
		      var urlPassword = urlAuth[1] || '';
		      auth = urlUsername + ':' + urlPassword;
		    }

		    if (auth && headerNames.authorization) {
		      delete headers[headerNames.authorization];
		    }

		    var isHttpsRequest = isHttps.test(protocol);
		    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

		    var options = {
		      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
		      method: config.method.toUpperCase(),
		      headers: headers,
		      agent: agent,
		      agents: { http: config.httpAgent, https: config.httpsAgent },
		      auth: auth
		    };

		    if (config.socketPath) {
		      options.socketPath = config.socketPath;
		    } else {
		      options.hostname = parsed.hostname;
		      options.port = parsed.port;
		    }

		    var proxy = config.proxy;
		    if (!proxy && proxy !== false) {
		      var proxyEnv = protocol.slice(0, -1) + '_proxy';
		      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
		      if (proxyUrl) {
		        var parsedProxyUrl = url.parse(proxyUrl);
		        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
		        var shouldProxy = true;

		        if (noProxyEnv) {
		          var noProxy = noProxyEnv.split(',').map(function trim(s) {
		            return s.trim();
		          });

		          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
		            if (!proxyElement) {
		              return false;
		            }
		            if (proxyElement === '*') {
		              return true;
		            }
		            if (proxyElement[0] === '.' &&
		                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
		              return true;
		            }

		            return parsed.hostname === proxyElement;
		          });
		        }

		        if (shouldProxy) {
		          proxy = {
		            host: parsedProxyUrl.hostname,
		            port: parsedProxyUrl.port,
		            protocol: parsedProxyUrl.protocol
		          };

		          if (parsedProxyUrl.auth) {
		            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
		            proxy.auth = {
		              username: proxyUrlAuth[0],
		              password: proxyUrlAuth[1]
		            };
		          }
		        }
		      }
		    }

		    if (proxy) {
		      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
		      setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
		    }

		    var transport;
		    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
		    if (config.transport) {
		      transport = config.transport;
		    } else if (config.maxRedirects === 0) {
		      transport = isHttpsProxy ? https : http;
		    } else {
		      if (config.maxRedirects) {
		        options.maxRedirects = config.maxRedirects;
		      }
		      transport = isHttpsProxy ? httpsFollow : httpFollow;
		    }

		    if (config.maxBodyLength > -1) {
		      options.maxBodyLength = config.maxBodyLength;
		    }

		    if (config.insecureHTTPParser) {
		      options.insecureHTTPParser = config.insecureHTTPParser;
		    }

		    // Create the request
		    var req = transport.request(options, function handleResponse(res) {
		      if (req.aborted) return;

		      // uncompress the response body transparently if required
		      var stream = res;

		      // return the last request in case of redirects
		      var lastRequest = res.req || req;


		      // if no content, is HEAD request or decompress disabled we should not decompress
		      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
		        switch (res.headers['content-encoding']) {
		        /*eslint default-case:0*/
		        case 'gzip':
		        case 'compress':
		        case 'deflate':
		        // add the unzipper to the body stream processing pipeline
		          stream = stream.pipe(zlib.createUnzip());

		          // remove the content-encoding in order to not confuse downstream operations
		          delete res.headers['content-encoding'];
		          break;
		        }
		      }

		      var response = {
		        status: res.statusCode,
		        statusText: res.statusMessage,
		        headers: res.headers,
		        config: config,
		        request: lastRequest
		      };

		      if (config.responseType === 'stream') {
		        response.data = stream;
		        settle(resolve, reject, response);
		      } else {
		        var responseBuffer = [];
		        var totalResponseBytes = 0;
		        stream.on('data', function handleStreamData(chunk) {
		          responseBuffer.push(chunk);
		          totalResponseBytes += chunk.length;

		          // make sure the content length is not over the maxContentLength if specified
		          if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
		            stream.destroy();
		            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
		              config, null, lastRequest));
		          }
		        });

		        stream.on('error', function handleStreamError(err) {
		          if (req.aborted) return;
		          reject(enhanceError$1(err, config, null, lastRequest));
		        });

		        stream.on('end', function handleStreamEnd() {
		          var responseData = Buffer.concat(responseBuffer);
		          if (config.responseType !== 'arraybuffer') {
		            responseData = responseData.toString(config.responseEncoding);
		            if (!config.responseEncoding || config.responseEncoding === 'utf8') {
		              responseData = utils.stripBOM(responseData);
		            }
		          }

		          response.data = responseData;
		          settle(resolve, reject, response);
		        });
		      }
		    });

		    // Handle errors
		    req.on('error', function handleRequestError(err) {
		      if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
		      reject(enhanceError$1(err, config, null, req));
		    });

		    // Handle request timeout
		    if (config.timeout) {
		      // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
		      var timeout = parseInt(config.timeout, 10);

		      if (isNaN(timeout)) {
		        reject(createError(
		          'error trying to parse `config.timeout` to int',
		          config,
		          'ERR_PARSE_TIMEOUT',
		          req
		        ));

		        return;
		      }

		      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
		      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
		      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
		      // And then these socket which be hang up will devoring CPU little by little.
		      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
		      req.setTimeout(timeout, function handleRequestTimeout() {
		        req.abort();
		        var transitional = config.transitional || defaults.transitional;
		        reject(createError(
		          'timeout of ' + timeout + 'ms exceeded',
		          config,
		          transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
		          req
		        ));
		      });
		    }

		    if (config.cancelToken || config.signal) {
		      // Handle cancellation
		      // eslint-disable-next-line func-names
		      onCanceled = function(cancel) {
		        if (req.aborted) return;

		        req.abort();
		        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
		      };

		      config.cancelToken && config.cancelToken.subscribe(onCanceled);
		      if (config.signal) {
		        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
		      }
		    }


		    // Send the request
		    if (utils.isStream(data)) {
		      data.on('error', function handleStreamError(err) {
		        reject(enhanceError$1(err, config, null, req));
		      }).pipe(req);
		    } else {
		      req.end(data);
		    }
		  });
		};
		return http_1;
	}

	var defaults_1;
	var hasRequiredDefaults;

	function requireDefaults () {
		if (hasRequiredDefaults) return defaults_1;
		hasRequiredDefaults = 1;

		var utils = utils$8;
		var normalizeHeaderName$1 = normalizeHeaderName;
		var enhanceError$1 = enhanceError;

		var DEFAULT_CONTENT_TYPE = {
		  'Content-Type': 'application/x-www-form-urlencoded'
		};

		function setContentTypeIfUnset(headers, value) {
		  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
		    headers['Content-Type'] = value;
		  }
		}

		function getDefaultAdapter() {
		  var adapter;
		  if (typeof XMLHttpRequest !== 'undefined') {
		    // For browsers use XHR adapter
		    adapter = requireXhr();
		  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
		    // For node use HTTP adapter
		    adapter = requireHttp();
		  }
		  return adapter;
		}

		function stringifySafely(rawValue, parser, encoder) {
		  if (utils.isString(rawValue)) {
		    try {
		      (parser || JSON.parse)(rawValue);
		      return utils.trim(rawValue);
		    } catch (e) {
		      if (e.name !== 'SyntaxError') {
		        throw e;
		      }
		    }
		  }

		  return (encoder || JSON.stringify)(rawValue);
		}

		var defaults = {

		  transitional: {
		    silentJSONParsing: true,
		    forcedJSONParsing: true,
		    clarifyTimeoutError: false
		  },

		  adapter: getDefaultAdapter(),

		  transformRequest: [function transformRequest(data, headers) {
		    normalizeHeaderName$1(headers, 'Accept');
		    normalizeHeaderName$1(headers, 'Content-Type');

		    if (utils.isFormData(data) ||
		      utils.isArrayBuffer(data) ||
		      utils.isBuffer(data) ||
		      utils.isStream(data) ||
		      utils.isFile(data) ||
		      utils.isBlob(data)
		    ) {
		      return data;
		    }
		    if (utils.isArrayBufferView(data)) {
		      return data.buffer;
		    }
		    if (utils.isURLSearchParams(data)) {
		      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
		      return data.toString();
		    }
		    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
		      setContentTypeIfUnset(headers, 'application/json');
		      return stringifySafely(data);
		    }
		    return data;
		  }],

		  transformResponse: [function transformResponse(data) {
		    var transitional = this.transitional || defaults.transitional;
		    var silentJSONParsing = transitional && transitional.silentJSONParsing;
		    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
		    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

		    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
		      try {
		        return JSON.parse(data);
		      } catch (e) {
		        if (strictJSONParsing) {
		          if (e.name === 'SyntaxError') {
		            throw enhanceError$1(e, this, 'E_JSON_PARSE');
		          }
		          throw e;
		        }
		      }
		    }

		    return data;
		  }],

		  /**
		   * A timeout in milliseconds to abort a request. If set to 0 (default) a
		   * timeout is not created.
		   */
		  timeout: 0,

		  xsrfCookieName: 'XSRF-TOKEN',
		  xsrfHeaderName: 'X-XSRF-TOKEN',

		  maxContentLength: -1,
		  maxBodyLength: -1,

		  validateStatus: function validateStatus(status) {
		    return status >= 200 && status < 300;
		  },

		  headers: {
		    common: {
		      'Accept': 'application/json, text/plain, */*'
		    }
		  }
		};

		utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
		  defaults.headers[method] = {};
		});

		utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
		  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
		});

		defaults_1 = defaults;
		return defaults_1;
	}

	var utils$4 = utils$8;
	var defaults$2 = requireDefaults();

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	var transformData$1 = function transformData(data, headers, fns) {
	  var context = this || defaults$2;
	  /*eslint no-param-reassign:0*/
	  utils$4.forEach(fns, function transform(fn) {
	    data = fn.call(context, data, headers);
	  });

	  return data;
	};

	var isCancel$1;
	var hasRequiredIsCancel;

	function requireIsCancel () {
		if (hasRequiredIsCancel) return isCancel$1;
		hasRequiredIsCancel = 1;

		isCancel$1 = function isCancel(value) {
		  return !!(value && value.__CANCEL__);
		};
		return isCancel$1;
	}

	var utils$3 = utils$8;
	var transformData = transformData$1;
	var isCancel = requireIsCancel();
	var defaults$1 = requireDefaults();
	var Cancel = requireCancel();

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }

	  if (config.signal && config.signal.aborted) {
	    throw new Cancel('canceled');
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	var dispatchRequest$1 = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData.call(
	    config,
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils$3.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers
	  );

	  utils$3.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults$1.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData.call(
	      config,
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData.call(
	          config,
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};

	var utils$2 = utils$8;

	/**
	 * Config-specific merge-function which creates a new config-object
	 * by merging two configuration objects together.
	 *
	 * @param {Object} config1
	 * @param {Object} config2
	 * @returns {Object} New object resulting from merging config2 to config1
	 */
	var mergeConfig$2 = function mergeConfig(config1, config2) {
	  // eslint-disable-next-line no-param-reassign
	  config2 = config2 || {};
	  var config = {};

	  function getMergedValue(target, source) {
	    if (utils$2.isPlainObject(target) && utils$2.isPlainObject(source)) {
	      return utils$2.merge(target, source);
	    } else if (utils$2.isPlainObject(source)) {
	      return utils$2.merge({}, source);
	    } else if (utils$2.isArray(source)) {
	      return source.slice();
	    }
	    return source;
	  }

	  // eslint-disable-next-line consistent-return
	  function mergeDeepProperties(prop) {
	    if (!utils$2.isUndefined(config2[prop])) {
	      return getMergedValue(config1[prop], config2[prop]);
	    } else if (!utils$2.isUndefined(config1[prop])) {
	      return getMergedValue(undefined, config1[prop]);
	    }
	  }

	  // eslint-disable-next-line consistent-return
	  function valueFromConfig2(prop) {
	    if (!utils$2.isUndefined(config2[prop])) {
	      return getMergedValue(undefined, config2[prop]);
	    }
	  }

	  // eslint-disable-next-line consistent-return
	  function defaultToConfig2(prop) {
	    if (!utils$2.isUndefined(config2[prop])) {
	      return getMergedValue(undefined, config2[prop]);
	    } else if (!utils$2.isUndefined(config1[prop])) {
	      return getMergedValue(undefined, config1[prop]);
	    }
	  }

	  // eslint-disable-next-line consistent-return
	  function mergeDirectKeys(prop) {
	    if (prop in config2) {
	      return getMergedValue(config1[prop], config2[prop]);
	    } else if (prop in config1) {
	      return getMergedValue(undefined, config1[prop]);
	    }
	  }

	  var mergeMap = {
	    'url': valueFromConfig2,
	    'method': valueFromConfig2,
	    'data': valueFromConfig2,
	    'baseURL': defaultToConfig2,
	    'transformRequest': defaultToConfig2,
	    'transformResponse': defaultToConfig2,
	    'paramsSerializer': defaultToConfig2,
	    'timeout': defaultToConfig2,
	    'timeoutMessage': defaultToConfig2,
	    'withCredentials': defaultToConfig2,
	    'adapter': defaultToConfig2,
	    'responseType': defaultToConfig2,
	    'xsrfCookieName': defaultToConfig2,
	    'xsrfHeaderName': defaultToConfig2,
	    'onUploadProgress': defaultToConfig2,
	    'onDownloadProgress': defaultToConfig2,
	    'decompress': defaultToConfig2,
	    'maxContentLength': defaultToConfig2,
	    'maxBodyLength': defaultToConfig2,
	    'transport': defaultToConfig2,
	    'httpAgent': defaultToConfig2,
	    'httpsAgent': defaultToConfig2,
	    'cancelToken': defaultToConfig2,
	    'socketPath': defaultToConfig2,
	    'responseEncoding': defaultToConfig2,
	    'validateStatus': mergeDirectKeys
	  };

	  utils$2.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
	    var merge = mergeMap[prop] || mergeDeepProperties;
	    var configValue = merge(prop);
	    (utils$2.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
	  });

	  return config;
	};

	var VERSION = requireData().version;

	var validators$1 = {};

	// eslint-disable-next-line func-names
	['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
	  validators$1[type] = function validator(thing) {
	    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
	  };
	});

	var deprecatedWarnings = {};

	/**
	 * Transitional option validator
	 * @param {function|boolean?} validator - set to false if the transitional option has been removed
	 * @param {string?} version - deprecated version / removed since version
	 * @param {string?} message - some message with additional info
	 * @returns {function}
	 */
	validators$1.transitional = function transitional(validator, version, message) {
	  function formatMessage(opt, desc) {
	    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
	  }

	  // eslint-disable-next-line func-names
	  return function(value, opt, opts) {
	    if (validator === false) {
	      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
	    }

	    if (version && !deprecatedWarnings[opt]) {
	      deprecatedWarnings[opt] = true;
	      // eslint-disable-next-line no-console
	      console.warn(
	        formatMessage(
	          opt,
	          ' has been deprecated since v' + version + ' and will be removed in the near future'
	        )
	      );
	    }

	    return validator ? validator(value, opt, opts) : true;
	  };
	};

	/**
	 * Assert object's properties type
	 * @param {object} options
	 * @param {object} schema
	 * @param {boolean?} allowUnknown
	 */

	function assertOptions(options, schema, allowUnknown) {
	  if (typeof options !== 'object') {
	    throw new TypeError('options must be an object');
	  }
	  var keys = Object.keys(options);
	  var i = keys.length;
	  while (i-- > 0) {
	    var opt = keys[i];
	    var validator = schema[opt];
	    if (validator) {
	      var value = options[opt];
	      var result = value === undefined || validator(value, opt, options);
	      if (result !== true) {
	        throw new TypeError('option ' + opt + ' must be ' + result);
	      }
	      continue;
	    }
	    if (allowUnknown !== true) {
	      throw Error('Unknown option ' + opt);
	    }
	  }
	}

	var validator$1 = {
	  assertOptions: assertOptions,
	  validators: validators$1
	};

	var utils$1 = utils$8;
	var buildURL = buildURL$1;
	var InterceptorManager = InterceptorManager_1;
	var dispatchRequest = dispatchRequest$1;
	var mergeConfig$1 = mergeConfig$2;
	var validator = validator$1;

	var validators = validator.validators;
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios$1(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios$1.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = arguments[1] || {};
	    config.url = arguments[0];
	  } else {
	    config = config || {};
	  }

	  config = mergeConfig$1(this.defaults, config);

	  // Set config.method
	  if (config.method) {
	    config.method = config.method.toLowerCase();
	  } else if (this.defaults.method) {
	    config.method = this.defaults.method.toLowerCase();
	  } else {
	    config.method = 'get';
	  }

	  var transitional = config.transitional;

	  if (transitional !== undefined) {
	    validator.assertOptions(transitional, {
	      silentJSONParsing: validators.transitional(validators.boolean),
	      forcedJSONParsing: validators.transitional(validators.boolean),
	      clarifyTimeoutError: validators.transitional(validators.boolean)
	    }, false);
	  }

	  // filter out skipped interceptors
	  var requestInterceptorChain = [];
	  var synchronousRequestInterceptors = true;
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
	      return;
	    }

	    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

	    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  var responseInterceptorChain = [];
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  var promise;

	  if (!synchronousRequestInterceptors) {
	    var chain = [dispatchRequest, undefined];

	    Array.prototype.unshift.apply(chain, requestInterceptorChain);
	    chain = chain.concat(responseInterceptorChain);

	    promise = Promise.resolve(config);
	    while (chain.length) {
	      promise = promise.then(chain.shift(), chain.shift());
	    }

	    return promise;
	  }


	  var newConfig = config;
	  while (requestInterceptorChain.length) {
	    var onFulfilled = requestInterceptorChain.shift();
	    var onRejected = requestInterceptorChain.shift();
	    try {
	      newConfig = onFulfilled(newConfig);
	    } catch (error) {
	      onRejected(error);
	      break;
	    }
	  }

	  try {
	    promise = dispatchRequest(newConfig);
	  } catch (error) {
	    return Promise.reject(error);
	  }

	  while (responseInterceptorChain.length) {
	    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
	  }

	  return promise;
	};

	Axios$1.prototype.getUri = function getUri(config) {
	  config = mergeConfig$1(this.defaults, config);
	  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
	};

	// Provide aliases for supported request methods
	utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios$1.prototype[method] = function(url, config) {
	    return this.request(mergeConfig$1(config || {}, {
	      method: method,
	      url: url,
	      data: (config || {}).data
	    }));
	  };
	});

	utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios$1.prototype[method] = function(url, data, config) {
	    return this.request(mergeConfig$1(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	var Axios_1 = Axios$1;

	var CancelToken_1;
	var hasRequiredCancelToken;

	function requireCancelToken () {
		if (hasRequiredCancelToken) return CancelToken_1;
		hasRequiredCancelToken = 1;

		var Cancel = requireCancel();

		/**
		 * A `CancelToken` is an object that can be used to request cancellation of an operation.
		 *
		 * @class
		 * @param {Function} executor The executor function.
		 */
		function CancelToken(executor) {
		  if (typeof executor !== 'function') {
		    throw new TypeError('executor must be a function.');
		  }

		  var resolvePromise;

		  this.promise = new Promise(function promiseExecutor(resolve) {
		    resolvePromise = resolve;
		  });

		  var token = this;

		  // eslint-disable-next-line func-names
		  this.promise.then(function(cancel) {
		    if (!token._listeners) return;

		    var i;
		    var l = token._listeners.length;

		    for (i = 0; i < l; i++) {
		      token._listeners[i](cancel);
		    }
		    token._listeners = null;
		  });

		  // eslint-disable-next-line func-names
		  this.promise.then = function(onfulfilled) {
		    var _resolve;
		    // eslint-disable-next-line func-names
		    var promise = new Promise(function(resolve) {
		      token.subscribe(resolve);
		      _resolve = resolve;
		    }).then(onfulfilled);

		    promise.cancel = function reject() {
		      token.unsubscribe(_resolve);
		    };

		    return promise;
		  };

		  executor(function cancel(message) {
		    if (token.reason) {
		      // Cancellation has already been requested
		      return;
		    }

		    token.reason = new Cancel(message);
		    resolvePromise(token.reason);
		  });
		}

		/**
		 * Throws a `Cancel` if cancellation has been requested.
		 */
		CancelToken.prototype.throwIfRequested = function throwIfRequested() {
		  if (this.reason) {
		    throw this.reason;
		  }
		};

		/**
		 * Subscribe to the cancel signal
		 */

		CancelToken.prototype.subscribe = function subscribe(listener) {
		  if (this.reason) {
		    listener(this.reason);
		    return;
		  }

		  if (this._listeners) {
		    this._listeners.push(listener);
		  } else {
		    this._listeners = [listener];
		  }
		};

		/**
		 * Unsubscribe from the cancel signal
		 */

		CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
		  if (!this._listeners) {
		    return;
		  }
		  var index = this._listeners.indexOf(listener);
		  if (index !== -1) {
		    this._listeners.splice(index, 1);
		  }
		};

		/**
		 * Returns an object that contains a new `CancelToken` and a function that, when called,
		 * cancels the `CancelToken`.
		 */
		CancelToken.source = function source() {
		  var cancel;
		  var token = new CancelToken(function executor(c) {
		    cancel = c;
		  });
		  return {
		    token: token,
		    cancel: cancel
		  };
		};

		CancelToken_1 = CancelToken;
		return CancelToken_1;
	}

	var spread;
	var hasRequiredSpread;

	function requireSpread () {
		if (hasRequiredSpread) return spread;
		hasRequiredSpread = 1;

		/**
		 * Syntactic sugar for invoking a function and expanding an array for arguments.
		 *
		 * Common use case would be to use `Function.prototype.apply`.
		 *
		 *  ```js
		 *  function f(x, y, z) {}
		 *  var args = [1, 2, 3];
		 *  f.apply(null, args);
		 *  ```
		 *
		 * With `spread` this example can be re-written.
		 *
		 *  ```js
		 *  spread(function(x, y, z) {})([1, 2, 3]);
		 *  ```
		 *
		 * @param {Function} callback
		 * @returns {Function}
		 */
		spread = function spread(callback) {
		  return function wrap(arr) {
		    return callback.apply(null, arr);
		  };
		};
		return spread;
	}

	var isAxiosError;
	var hasRequiredIsAxiosError;

	function requireIsAxiosError () {
		if (hasRequiredIsAxiosError) return isAxiosError;
		hasRequiredIsAxiosError = 1;

		/**
		 * Determines whether the payload is an error thrown by Axios
		 *
		 * @param {*} payload The value to test
		 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
		 */
		isAxiosError = function isAxiosError(payload) {
		  return (typeof payload === 'object') && (payload.isAxiosError === true);
		};
		return isAxiosError;
	}

	var utils = utils$8;
	var bind = bind$2;
	var Axios = Axios_1;
	var mergeConfig = mergeConfig$2;
	var defaults = requireDefaults();

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  // Factory for creating new instances
	  instance.create = function create(instanceConfig) {
	    return createInstance(mergeConfig(defaultConfig, instanceConfig));
	  };

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Expose Cancel & CancelToken
	axios.Cancel = requireCancel();
	axios.CancelToken = requireCancelToken();
	axios.isCancel = requireIsCancel();
	axios.VERSION = requireData().version;

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = requireSpread();

	// Expose isAxiosError
	axios.isAxiosError = requireIsAxiosError();

	axios$1.exports = axios;

	// Allow use of default import syntax in TypeScript
	axios$1.exports.default = axios;

	(function (module) {
		module.exports = axios$1.exports;
	} (axios$2));

	var $axios = /*@__PURE__*/getDefaultExportFromCjs(axios$2.exports);

	function createSign(timestamp, secret) {
	    const stringToSign = `${timestamp}\n${secret}`;
	    const hash = HmacSHA256(stringToSign, secret);
	    const signData = Base64.stringify(hash);
	    return encodeURIComponent(signData);
	}
	class RobotDing {
	    constructor(config) {
	        this.webhook = config.webhook;
	        this.secret = config.secret;
	    }
	    sendDing(config, msgtype) {
	        const timestamp = new Date().getTime();
	        const sign = createSign(timestamp, this.secret);
	        let postData;
	        switch (msgtype) {
	            case "text":
	            default:
	                const dingTextConfig = config;
	                postData = {
	                    msgtype: msgtype || "text",
	                    at: {
	                        atMobiles: dingTextConfig.atMobiles,
	                        atUserIds: dingTextConfig.atUserIds,
	                        isAtAll: dingTextConfig.isAtAll
	                    },
	                    text: {
	                        content: dingTextConfig.content
	                    }
	                };
	                break;
	            case "link":
	                const dingLinkConfig = config;
	                postData = {
	                    msgtype,
	                    link: dingLinkConfig
	                };
	                break;
	            case "markdown":
	                const dingMarkdownConfig = config;
	                postData = {
	                    msgtype,
	                    markdown: {
	                        title: dingMarkdownConfig.title,
	                        text: dingMarkdownConfig.text,
	                        at: {
	                            atUserIds: dingMarkdownConfig.atUserIds,
	                            atMobiles: dingMarkdownConfig.atMobiles,
	                            isAtAll: dingMarkdownConfig.isAtAll
	                        }
	                    }
	                };
	                break;
	            case "actionCard":
	                const dingSingleBtnActionCardConfig = config;
	                const dingMoreBtnActionCardConfig = config;
	                postData = {
	                    msgtype,
	                    actionCard: dingMoreBtnActionCardConfig.btns
	                        ? dingMoreBtnActionCardConfig
	                        : dingSingleBtnActionCardConfig
	                };
	                break;
	            case "feedCard":
	                const dingFeedCardConfig = config;
	                postData = {
	                    msgtype,
	                    feedCard: dingFeedCardConfig
	                };
	                break;
	        }
	        return this.sendService(postData, timestamp, sign);
	    }
	    sendService(postData, timestamp, sign) {
	        return $axios.post(this.webhook, postData, {
	            params: {
	                timestamp,
	                sign
	            }
	        });
	    }
	}

	return RobotDing;

}));
