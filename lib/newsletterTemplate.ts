import type { NewsletterContent, NewsletterProperty } from "@/types";

const LOGO_B64 =
  "iVBORw0KGgoAAAANSUhEUgAAAJAAAACMCAIAAAAcMLcPAAAnfUlEQVR42u19d3xUVfr3KffeqcmkExISUoAQekkokdBbEnqCrIoKCujaRdRddfe3+1pQd60rsAq6RcFVCKGoQGhKFRGESe+EEEhPpmTanXvv+8dJhmFaJpMBQsj58Ee4c+bMued7nv6c50BBEEBvu3Ma6l2CXsB6Wy9gva0XsF7A7uDG8zzP83fEVKm7GSdBEHiOgwghhAhsgiBgjLvznOFdqNYLgsDzPISQ4AQAKCstNbGm+Pghlk8RQhDCXsC6F05XqqoOZB/Yu2fP6dOnWJZNSUldvXrN1GnTyKdmsxlj3N1g6/mAEZwAABZed+3atUMHD+7evev06VN1dXUEQgghx3E0TU+YmLTq0VWLFi+WSCQAAI7jrDHuBezW4VRXV3fkyOHdu3adPHni2rVrBAaz2UzT9IgRIwCAv/12HkIIIeR5Pn7IkIcefOiB5ctDQ/t2L/Em9KzG87zZbDabzZYnDQ0NO3bseHD5A/0j+9EUoikkZigKA7GIHjZ0yPPPPXvkyGGj0WgyGbd/++2c2bNkUjFNIbGIxghERoSvff673Jwc68EJeLergZ6KU3Nz8+7dux95ZGVMdH+GxhSGYhFFYShiqMFxg5568sns7GytVms/1PHjxx966MGgQH+MgETMUBj6+ynu+92yw4cPW/qwLHu7YAM9DCeNRv3D998//tiagQNirXFiaDxwQMxja1b/8MP3KpXKZpyWlhbLgOSPosLCP/zh5ejo/hgBsYimKSQRM9OmTtn61Vetra2kj9ls5jiuFzBPcNLpdAezs5966sn4wXEipo2SCE4x0VErVzy8e/eupqYmm3EaGhoyM3esWPFwbEx0amrKnt27WZa17lBfX/fxxx+NHTOaoTFDYxFD0RQaPmzou+++c/VqNenDcZz1THoBuwEnjuOs19RoNP549Ojzzz07fNgQsYimMCBrSlOof2TE8gfu37F9e319vXOcohgaYwhkUjHBeML4cf/ctNEGWqPRuGP79rlzZsukEhpDIt4i+oU/99yzSqXyFou3OwMwG5xYlj154sRLL64bNXKEVCLCqA0nCsOIfmHLli3dtm1rTU2NzSBNTU1ZWTtXrlzRhhMCNIUwAj5yaYC/wt/Pl8IAI0BhOGhg7J//9FppaakNnzxx4viKhx8KDgrACEjENIWhv5/vsmVLDx06eMvEG7iDcOI47syZn1999ZWEsWNkUrE1TmF9+6SnL/73v/9dXV1tM0hjY2NW1s5HVq4YOCCGoSkLThIxEz940IsvvpCaMpdh6AGx0WvXPhcT3R9BQGGIIAgNCV716CM//3zaBrbi4qI//vEPMdFRGEGLeJs6ZfKXX/63tVV7s8Ub6LY4We/Tc+fO/fWvfxk/LtFHLiU4MRTCCPQJCVq4YP7mzZsrKyttBmlubtq9e9eqRx+x4ERgkEpEI4YPe+7ZZw4dPKhWqwVBeP65ZwEAQ4cMJkLr/fffHz16JCFBBIGvj2xeWuquXVk24q2hof6TT/6RMHaMRbxRFBo2dMg777xdXX3l5ok30J1xunjx4vr1b026Z6Kvj6wNJxpjBIICA1JT5m7atLGsrNSe7xGcBg0cIGIoBAGFAIJAJhWPHjVy3Qtrjx49otfrrRf0id8/DgCIHzyoubmZPDcY9N9887/Zs2bKpBKMAPnp8eMSN23c2NjYaP1zJpNpZ2ZmSsocuUxCU23irV942LPPPH3x4kVLNy+KN9ANccrLy/v73/42bepkP4UPRkDEYIJTgL9i1swZH3/8UVFRkR09NX/33d41q1dZcCL0IZdJE8aOfvnll44dO2Y0Gq1X0Gw2m0wmQRCefOL3BDCNRsPzPHlI2k8//fTg8geCAgMQBBQGFIYDB8b+6bVXLeJNaJ/1yZMnV654ODg40CLe/BS+S5dmHMzO9q54A7cRJzPLWjP6oqKijz76cNbMGQH+CowAQ2MRgzECfgqfqVMmv/f3v+fl5TnAae/eNatXxcUNFItoCACCbXxsXGLCq6++curkSdYKAIKTZdUIl7MGjMgqnuetF7egoOCll16MjuqPURu99gkJfvTRR06fthVvJSXFr77yx9iYaApfF29TJif/9z//sRjpXRRvtxowov5az7i8vHzDhk9SUuYEBQa040RhBBS+8kn3JK1f/5bSirdY7FxiHQ9ux4lApfCVJ00c/5f/+/OZM2eshQfLsg6ZkjPALFvKZDJZxqmtrf3www/GjB5lEW8+cmlaasquXVnWRCkIQmNDw4YNnyQmjL0u3jAaOiT+7fXrr1yp6qJ4A7cLp8uXKzdv/mz+/LQ+IUHWOPnIpRMmjPvrX/9y/vw5m53Y0tLy/fffP/74Y/GDB4lFNIWhv5/vsmVLDx06eMvEG7iDcOI47syZn1999ZWEsWNkUrE1TmF9+6SnL/73v/9dXV1tM0hjY2NW1s5HVq4YOCCGoSkLThIxEz940IsvvpCaMpdh6AGx0WvXPhcT3R9BQGGIIAgNCV716CM//3zaBrbi4qI//vEPMdFRGEGLeJs6ZfKXX/63tVV7s8Ub6LY4We/Tc+fO/fWvfxk/LtFHLiU4MRTCCPQJCVq4YP7mzZsrKyttBmlubtq9e9eqRx+x4ERgkEpEI4YPe+7ZZw4dPKhWqwVBeP65ZwEAQ4cMJkLr/fffHz16JCFBBIGvj2xeWuquXVk24q2hof6TT/6RMHaMRbxRFBo2dMg777xdXX3l5ok30J1xunjx4vr1b026Z6Kvj6wNJxpjBIICA1JT5m7atLGsrNSe7xGcBg0cIGIoBAGFAIJAJhWPHjVy3Qtrjx49otfrrRf0id8/DgCIHzyoubmZPDcY9N9887/Zs2bKpBKMAPnp8eMSN23c2NjYaP1zJpNpZ2ZmSsocuUxCU23irV942LPPPH3x4kVLNy+KN9ANccrLy/v73/82bepkP4UPRkDEYIJTgL9i1swZH3/8UVFRkR09NX/33d41q1dZcCL0IZdJE8aOfvnll44dO2Y0Gq1X0Gw2m0wmQRCefOL3BDCNRsPzPHlI2k8//fTg8geCAgMQBBQGFIYDB8b+6bVXLeJNaJ/1yZMnV654ODg40CLe/BS+S5dmHMzO9q54A7cRJzPLWjP6oqKijz76cNbMGQH+CowAQ2MRgzECfgqfqVMmv/f3v+fl5TnAae/eNatXxcUNFItoCACCbXxsXGLCq6++curkSdYKAIKTZdUIl7MGjMgqnuetF7egoOCll16MjuqPURu99gkJfvTRR06fthVvJSXFr77yx9iYaApfF29TJif/9z//sRjpXRRvtxowov5az7i8vHzDhk9SUuYEBQa040RhBBS+8kn3JK1f/5bSirdY7FxiHQ9ux4lApfCVJ00c/5f/+/OZM2eshQfLsg6ZkjPALFvKZDJZxqmtrf3www/GjB5lEW8+cmlaasquXVnWRCkIQmNDw4YNnyQmjL0u3jAaOiT+7fXrr1yp6qJ4A7cLp8uXKzdv/mz+/LQ+IUHWOPnIpRMmjPvrX/9y/vw5m53Y0tLy/fffP/74Y/GDB4lFNIWhv5/vsmVLDx06eMvEG7iDcOI47syZn1999ZWEsWNkUrE1TmF9+6SnL/73v/9dXV1tM0hjY2NW1s5HVq4YOCCGoSkLThIxEz940IsvvpCaMpdh6AGx0WvXPhcT3R9BQGGIIAgNCV716CM//3zaBrbi4qI//vEPMdFRGEGLeJs6ZfKXX/63tVV7s8Ub6LY4We/Tc+fO/fWvfxk/LtFHLiU4MRTCCPQJCVq4YP7mzZsrKyttBmlubtq9e9eqRx+x4ERgkEpEI4YPe+7ZZw4dPKhWqwVBeP65ZwEAQ4cMJkLr/fffHz16JCFBBIGvj2xeWuquXVk24q2hof6TT/6RMHaMRbxRFBo2dMg777xdXX3l5ok30J1xunjx4vr1b026Z6Kvj6wNJxpjBIICA1JT5m7atLGsrNSe7xGcBg0cIGIoBAGFAIJAJhWPHjVy3Qtrjx49otfrrRf0id8/DgCIHzyoubmZPDcY9N9887/Zs2bKpBKMAPnp8eMSN23c2NjYaP1zJpNpZ2ZmSsocuUxCU23irV942LPPPH3x4kVLNy+KN9ANccrLy/v73/82bepkP4UPRkDEYIJTgL9i1swZH3/8UVFRkR09NX/33d41q1dZcCL0IZdJE8aOfvnll44dO2Y0Gq1X0Gw2m0wmQRCefOL3BDCNRsPzPHlI2k8//fTg8geCAgMQBBQGFIYDB8b+6bVXLeJNaJ/1yZMnV654ODg40CLe/BS+S5dmHMzO9q54A7cRJzPLWjP6oqKijz76cNbMGQH+CowAQ2MRgzECfgqfqVMmv/f3v+fl5TnAae/eNatXxcUNFItoCACCbXxsXGLCq6++curkSdYKAIKTZdUIl7MGjMgqnuetF7egoOCll16MjuqPURu99gkJfvTRR06fthVvJSXFr77yx9iYaApfF29TJif/9z//sRjpXRRvtxowov5az7i8vHzDhk9SUuYEBQa040RhBBS+8kn3JK1f/5bSirdY7FxiHQ9ux4lApfCVJ00c/5f/+/OZM2eshQfLsg6ZkjPALFvKZDJZxqmtrf3www/GjB5lEW8+cmlaasquXVnWRCkIQmNDw4YNnyQmjL0u3jAaOiT+7fXrr1yp6qJ4A7cLp8uXKzdv/mz+/LQ+IUHWOPnIpRMmjPvrX/9y/vw5m53Y0tLy/fffP/74Y/GDB4lFNIWhv5/vsmVLDx06eMvEG7iDcOI47syZn1999ZWEsWNkUrE1TmF9+6SnL/73v/9dXV1tM0hjY2NW1s5HVq4YOCCGoSkLThIxEz940IsvvpCaMpdh6AGx0WvXPhcT3R9BQGGIIAgNCV716CM//3zaBrbi4qI//vEPMdFRGEGLeJs6ZfKXX/63tVV7s8Ub6LY4We/Tc+fO/fWvfxk/LtFHLiU4MRTCCPQJCVq4YP7mzZsrKyttBmlubtq9e9eqRx+x4ERgkEpEI4YPe+7ZZw4dPKhWqwVBeP65ZwEAQ4cMJkLr/fffHz16JCFBBIGvj2xeWuquXVk24q2hof6TT/6RMHaMRbxRFBo2dMg777xdXX3l5ok30J1xunjx4vr1b026Z6Kvj6wNJxpjBIICA1JT5m7atLGsrNSe7xGcBg0cIGIoBAGFAIJAJhWPHjVy3Qtrjx49otfrrRf0id8/DgCIHzyoubmZPDcY9N9887/Zs2bKpBKMAPnp8eMSN23c2NjYaP1zJpNpZ2ZmSsocuUxCU23irV942LPPPH3x4kVLNy+KN9ANccrLy/v73/82bepkP4UPRkDEYIJTgL9i1swZH3/8UVFRkR09NX/33d41q1dZcCL0IZdJE8aOfvnll44dO2Y0Gq1X0Gw2m0wmQRCefOL3BDCNRsPzPHlI2k8//fTg8geCAgMQBBQGFIYDB8b+6bVXLeJNaJ/1yZMnV654ODg40CLe/BS+S5dmHMzO9q54A7cRJzPLWjP6oqKijz76cNbMGQH+CowAQ2MRgzECfgqfqVMmv/f3v+fl5TnAae/eNatXxcUNFItoCACCbXxsXGLCq6++curkSdYKAIKTZdUIl7MGjMgqnuetF7egoOCll16MjuqPURu99gkJfvTRR06fthVvJSXFr77yx9iYaApfF29TJif/9z//sRjpXRRvtxowov5az7i8vHzDhk9SUuYEBQa040RhBBS+8kn3JK1f/5bSirdY7FxiHQ9ux4lApfCVJ00c/5f/+/OZM2eshQfLsg6ZkjPALFvKZDJZxqmtrf3www/GjB5lEW8+cmlaasquXVnWRCkIQmNDw4YNnyQmjL0u3jAaOiT+7fXrr1yp6qJ4A7cLp8uXKzdv/mz+/LQ+IUHWOPnIpRMmjPvrX/9y/vw5m53Y0tLy/fffP/74Y/GDB4lFNIWhv5/vsmVLDx06eMvEG7iDcOI47syZn1999ZWEsWNkUrE1TmF9+6SnL/73v/9dXV1tM0hjY2NW1s5HVq4YOCCGoSkLThIxEz940IsvvpCaMpdh6AGx0WvXPhcT3R9BQGGIIAgNCV716CM//3zaBrbi4qI//vEPMdFRGEGLeJs6ZfKXX/63tVV7s8Ub6LY4We/Tc+fO/fWvfxk/LtFHLiU4MRTCCPQJCVq4YP7mzZsrKyttBmlubtq9e9eqRx+x4ERgkEpEI4YPe+7ZZw4dPKhWqwVBeP65ZwEAQ4cMJkLr/fffHz16JCFBBIGvj2xeWuquXVk24q2hof6TT/6RMHaMRbxRFBo2dMg777xdXX3l5ok30J1xunjx4vr1b026Z6Kvj6wNJxpjBIICA1JT5m7atLGsrNSe7xGcBg0cIGIoBAGFAIJAJhWPHjVy3Qtrjx49otfrrRf0id8/DgCIHzyoubmZPDcY9N9887/Zs2bKpBKMAPnp8eMSN23c2NjYaP1zJpNpZ2ZmSsocuUxCU23irV942LPPPH3x4kVLNy+KN9ANccrLy/v73/82bepkP4UPRkDEYIJTgL9i1swZH3/8UVFRkR09NX/33d41q1dZcCL0IZdJE8aOfvnll44dO2Y0Gq1X0Gw2m0wmQRCefOL3BDCNRsPzPHlI2k8//fTg8geCAgMQBBQGFIYDB8b+6bVXLeJNaJ/1yZMnV654ODg40CLe/BS+S5dmHMzO9q54A7cRJzPLWjP6oqKijz66cNbMGQH+CowAQ2MRgzECfgqfqVMmv/f3v+fl5TnAae/eNatXxcUNFItoCACCbXxsXGLCq6++curkSdYKAIKTZdUIl7MGjMgqnuetF7egoOCll16MjuqPURu99gkJfvTRR06fthVvJSXFr77yx9iYaApfF29TJif/9z//sRjpXRRvtxowov5az7i8vHzDhk9SUuYEBQa040RhBBS+8kn3JK1f/5bSirdY7FxiHQ9ux4lApfCVJ00c/5f/+/OZM2eshQfLsg6ZkjPALFvKZDJZxqmtrf3www/GjB5lEW8+cmlaasquXVnWRCkIQmNDw4YNnyQmjL0u3jAaOiT+7fXrr1yp6qJ4A7cLp8uXKzdv/mz+/LQ+IUHWOPnIpRMmjPvrX/9y/vw5m53Y0tLy/fffP/74Y/GDB4lFNIWhv5/vsmVLDx06eMvEG7iDcOI47syZn1999ZWEsWNkUrE1TmF9+6SnL/73v/9dXV1tM0hjY2NW1s5HVq4YOCCGoSkLThIxEz940IsvvpCaMpdh6AGx0WvXPhcT3R9BQGGIIAgNCV716CM//3zaBrbi4qI//vEPMdFRGEGLeJs6ZfKXX/63tVV7s8Ub6LY4We/Tc+fO/fWvfxk/LtFHLiU4MRTCCPQJCVq4YP7mzZsrKyttBmlubtq9e9eqRx+x4ERgkEpEI4YPe+7ZZw4dPKhWqwVBeP65ZwEAQ4cMJkLr/fffHz16JCFBBIGvj2xeWuquXVk24q2hof6TT/6RMHaMRbxRFBo2dMg777xdXX3l5ok30J1xunjx4vr1b026Z6Kvj6wNJxpjBIICA1JT5m7atLGsrNSe7xGcBg0cIGIoBAGFAIJAJhWPHjVy3Qtrjx49otfrrRf0id8/DgCIHzyoubmZPDcY9N9887/Zs2bKpBKMAPnp8eMSN23c2NjYaP1zJpNpZ2ZmSsocuUxCU23irV942LPPPH3x4kVLNy+KN9ANccrLy/v73/82bepkP4UPRkDEYIJTgL9i1swZH3/8UVFRkR09NX/33d41q1dZcCL0IZdJE8aOfvnll44dO2Y0Gq1X0Gw2m0wmQRCefOL3BDCNRsPzPHlI2k8//fTg8geCAgMQBBQGFIYDB8b+6bVXLeJNaJ/1yZMnV654ODg40CLe/BS+S5dmHMzO9q54A7cRJzPLWjP6oqKijz66cNbMGQH+CowAQ2MRgzECfgqfqVMmv/f3v+fl5TnAae/eNatXxcUNFItoCACCbXxsXGLCq6++curkSdYKAIKTZdUIl7MGjMgqnuetF7egoOCll16MjuqPURu99gkJfvTRR06fthVvJSXFr77yx9iYaApfF29TJif/9z//sRjpXRRvtxowov5az7i8vHzDhk9SUuYEBQa040RhBBS+8kn3JK1f/5bSirdY7FxiHQ9ux4lApfCVJ00c/5f/+/OZM2eshQfLsg6ZkjPALFvKZDJZxqmtrf3www/GjB5lEW8+cmlaasquXVnWRCkIQmNDw4YNnyQmjL0u3jAaOiT+7fXrr1yp6qJ4A7cLp8uXKzdv/mz+/LQ+IUHWOPnIpRMmjPvrX/9y/vw5m53Y0tLy/fffP/74Y/GDB4lFNIWhv5/vsmVLDx06eMvEG7iDcOI47syZn1999ZWEsWNkUrE1TmF9+6SnL/73v/9dXV1tM0hjY2NW1s5HVq4YOCCGoSkLThIxEz940IsvvpCaMpdh6AGx0WvXPhcT3R9BQGGIIAgNCV716CM//3zaBrbi4qI//vEPMdFRGEGLeJs6ZfKXX/63tVV7s8Ub6LY4We/Tc+fO/fWvfxk/LtFHLiU4MRTCCPQJCVq4YP7mzZsrKyttBmlubtq9e9eqRx+x4ERgkEpEI4YPe+7ZZw4dPKhWqwVBeP65ZwEAQ4cMJkLr/fffHz16JCFBBIGvj2xeWuquXVk24q2hof6TT/6RMHaMRbxRFBo2dMg777xdXX3l5ok30J1xunjx4vr1b026Z6Kvj6wNJxpjBIICA1JT5m7atLGsrNSe7xGcBg0cIGIoBAGFAIJAJhWPHjVy3Qtrjx49otfrrRf0id8/DgCIHzyoubmZPDcY9N9887/Zs2bKpBKMAPnp8eMSN23c2NjYaP1zJpNpZ2ZmSsocuUxCU23irV942LPPPH3x4kVLNy+KN9ANccrLy/v73/82bepkP4UPRkDEYIJTgL9i1swZH3/8UVFRkR09NX/33d41q1dZcCL0IZdJE8aOfvnll44dO2Y0Gq1X0Gw2m0wmQRCefOL3BDCNRsPzPHlI2k8//fTg8geCAgMQBBQGFIYDB8b+6bVXLeJNaJ/1yZMnV654ODg40CLe/BS+S5dmHMzO9q54A7cRJzPLWjP6oqKijz66cNbMGQH+CowAQ2MRgzECfgqfqVMmv/f3v+fl5TnAae/eNatXxcUNFItoCACCbXxsXGLCq6++curkSdYKAIKTZdUIl7MGjMgqnuetF7egoOCll16MjuqPURu99gkJfvTRR06fthVvJSXFr77yx9iYaApfF29TJif/9z//sRjpXRRvtxowov5az7i8vHzDhk9SUuYEBQa040RhBBS+8kn3JK1f/5bSirdY7FxiHQ9ux4lApfCVJ00c/5f/+/OZM2eshQfLsg6ZkjPALFvKZDJZxqmtrf3www/GjB5lEW8+cmlaasquXVnWRCkIQmNDw4YNnyQmjL0u3jAaOiT+7fXrr1yp6qJ4A7cLp8uXKzdv/mz+/LQ+IUHWOPnIpRMmjPvrX/9y/vw5m53Y0tLy/fffP/74Y/GDB4lFNIWhv5/vsmVLDx06eMvEG7iDcOI47syZn1999ZWEsWNkUrE1TmF9+6SnL/73v/9dXV1tM0hjY2NW1s5HVq4YOCCGoSkLThIxEz940IsvvpCaMpdh6AGx0WvXPhcT3R9BQGGIIAgNCV716CM//3zaBrbi4qI//vEPMdFRGEGLeJs6ZfKXX/63tVV7s8Ub6LY4We/Tc+fO/fWvfxk/LtFHLiU4MRTCCPQJCVq4YP7mzZsrKyttBmlubtq9e9eqRx+x4ERgkEpEI4YPe+7ZZw4dPKhWqwVBeP65ZwEAQ4cMJkLr/fffHz16JCFBBIGvj2xeWuquXVk24q2hof6TT/6RMHaMRbxRFBo2dMg777xdXX3l5ok30J1xunjx4vr1b026Z6Kvj6wNJxpjBIICA1JT5m7atLGsrNSe7xGcBg0cIGIoBAGFAIJAJhWPHjVy3Qtrjx49otfrrRf0id8/DgCIHzyoubmZPDcY9N9887/Zs2bKpBKMAPnp8eMSN23c2NjYaP1zJpNpZ2ZmSsocuUxCU23irV942LPPPH3x4kVLNy+KN9ANccrLy/v73/82bepkP4UPRkDEYIJTgL9i1swZH3/8UVFRkR09NX/33d41q1dZcCL0IZdJE8aOfvnll44dO2Y0Gq1X0Gw2m0wmQRCefOL3BDCNRsPzPHlI2k8//fTg8geCAgMQBBQGFIYDB8b+6bVXLeJNaJ/1yZMnV654ODg40CLe/BS+S5dmHMzO9q54A7cRJzPLWjP6oqKijz66cNbMGQH+CowAQ2MRgzECfgqfqVMmv/f3v+fl5TnAae/eNatXxcUNFItoCACCbXxsXGLCq6++curkSdYKAIKTZdUIl7MGjMgqnuetF7egoOCll16MjuqPURu99gkJfvTRR06fthVvJSXFr77yx9iYaApfF29TJif/9z//sRjpXRRvtxowov5az7i8vHzDhk9SUuYEBQa040RhBBS+8kn3JK1f/5bSirdY7FxiHQ9ux4lApfCVJ00c/5f/+/OZM2eshQfLsg6ZkjPALFvKZDJZxqmtrf3www/GjB5lEW8+cmlaasquXVnWRCkIQmNDw4YNnyQmjL0u3jAaOiT+7fXrr1yp6qJ4A7cLp8uXKzdv/mz+/LQ+IUHWOPnIpRMmjPvrX/9y/vw5m53Y0tLy/fffP/74Y/GDB4lFNIWhv5/vsmVLDx06eMvEG7iDcOI47syZn1999ZWEsWNkUrE1TmF9+6SnL/73v/9dXV1tM0hjY2NW1s5HVq4YOCCGoSkLThIxEz940IsvvpCaMpdh6AGx0WvXPhcT3R9BQGGIIAgNCV716CM//3zaBrbi4qI//vEPMdFRGEGLeJs6ZfKXX/63tVV7s8Ub6LY4We/Tc+fO/fWvfxk/LtFHLiU4MRTCCPQJCVq4YP7mzZsrKyttBmlubtq9e9eqRx+x4ERgkEpEI4YPe+7ZZw4dPKhWqwVBeP65ZwEAQ4cMJkLr/fffHz16JCFBBIGvj2xeWuquXVk24q2hof6TT/6RMHaMRbxRFBo2dMg777xdXX3l5ok30J1xunjx4vr1b026Z6Kvj6wNJxpjBIICA1JT5m7atLGsrNSe7xGcBg0cIGIoBAGFAIJAJhWPHjVy3Qtrjx49otfrrRf0id8/DgCIHzyoubmZPDcY9N9887/Zs2bKpBKMAPnp8eMSN23c2NjYaP1zJpNpZ2ZmSsocuUxCU23irV942LPPPH3x4kVLNy+KN9ANccrLy/v73/82bepkP4UPRkDEYIJTgL9i1swZH3/8UVFRkR09NX/33d41q1dZcCL0IZdJE8aOfvnll44dO2Y0Gq1X0Gw2m0wmQRCefOL3BDCNRsPzPHlI2k8//fTg8geCAgMQBBQGFIYDB8b+6bVXLeJNaJ/1yZMnV654ODg40CLe/BS+S5dmHMzO9q54A7cRJzPLWjP6oqKijz66cNbMGQH+CowAQ2MRgzECfgqfqVMmv/f3v+fl5TnAae/eNatXxcUNFItoCACCbXxsXGLCq6++curkSdYKAIKTZdUIl7MGjMgqnuetF7egoOCll16MjuqPURu99gkJfvTRR06fthVvJSXFr77yx9iYaApfF29TJif/9z//sRjpXRRvtxowov5az7i8vHzDhk9SUuYEBQa040RhBBS+8kn3JK1f/5bSirdY7FxiHQ9ux4lApfCVJ00c/5f/+/OZM2eshQfLsg6ZkjPALFvKZDJZxqmtrf3www/GjB5lEW8+cmlaasquXVnWRCkIQmNDw4YNnyQmjL0u3jAaOiT+7fXrr1yp6qJ4A7cLp8uXKzdv/mz+/LQ+IUHWOPnIpRMmjPvrX/9y/vw5m53Y0tLy/fffP/74Y/GDB4lFNIWhv5/vsmVLDx06eMvEG7iDcOI47syZn1999ZWEsWNkUrE1TmF9+6SnL/73v/9dXV1tM0hjY2NW1s5HVq4YOCCGoSkLThIxEz940IsvvpCaMpdh6AGx0WvXPhcT3R9BQGGIIAgNCV716CM//3zaBrbi4qI//vEPMdFRGEGLeJs6ZfKXX/63tVV7s8Ub6LY4We/Tc+fO/fWvfxk/LtFHLiU4MRTCCPQJCVq4YP7mzZsrKyttBmlubtq9e9eqRx+x4ERgkEpEI4YPe+7ZZw4dPKhWqwVBeP65ZwEAQ4cMJkLr/fffHz16JCFBBIGvj2xeWuquXVk24q2hof6TT/6RMHaMRbxRFBo2dMg777xdXX3l5ok30J1xunjx4vr1b026Z6Kvj6wNJxpjBIICA1JT5m7atLGsrNSe7xGcBg0cIGIoBAGFAIJAJhWPHjVy3Qtrjx49otfrrRf0id8/DgCIHzyoubmZPDcY9N9887CYII=";

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=360&fit=crop",
];

const TIP_ICONS: Record<string, string> = {
  rada: "&#128161;",
  novinky: "&#128240;",
  trh: "&#128202;",
};

const TIP_LABELS: Record<string, string> = {
  rada: "REALITNÁ RADA",
  novinky: "NOVINKY Z TRHU",
  trh: "POHĽAD NA TRH",
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeHtml(s: string): string {
  // Allow only <strong>, <br/> — strip everything else
  return s
    .replace(/&/g, "&amp;")
    .replace(/<(?!\/?(?:strong|br)\b)[^>]*>/gi, "")
    .replace(/&amp;(?=(?:strong|br))/g, "&");
}

function buildPropertyCard(p: NewsletterProperty, idx: number): string {
  const img = p.imageUrl || PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length];
  const badgeHtml = p.badge
    ? `<tr><td style="background:${p.badge === "ZNÍŽENÁ CENA" ? "#1C1917" : "#E0882C"};padding:6px 18px;height:28px;line-height:1;"><span style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:9px;font-weight:800;color:#FFFFFF;letter-spacing:2.5px;text-transform:uppercase;">${esc(p.badge)}</span></td></tr>`
    : `<tr><td style="height:28px;padding:0;font-size:0;line-height:0;">&nbsp;</td></tr>`;

  const meta = [p.area ? `<strong>${esc(p.area)}</strong>` : null, p.rooms ? `<strong>${esc(p.rooms)}</strong>` : null]
    .filter(Boolean)
    .join("&nbsp;·&nbsp;");

  return `<table cellpadding="0" cellspacing="0" border="0" width="274" height="100%"
    style="background:#FFFFFF;border-radius:8px;overflow:hidden;border:1px solid #E3E1DC;box-shadow:0 2px 12px rgba(0,0,0,0.07);height:100%;">
    <tr><td style="padding:0;line-height:0;"><img src="${esc(img)}" alt="${esc(p.title)}" width="274" height="180" style="display:block;width:274px;height:180px;object-fit:cover;border:0;"/></td></tr>
    ${badgeHtml}
    <tr><td style="padding:16px 16px 20px 16px;">
      <h3 style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#1C1917;margin:0 0 7px 0;line-height:1.3;">${esc(p.title)}</h3>
      <p style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:19px;font-weight:800;color:#E0882C;margin:0 0 8px 0;line-height:1;">${esc(p.price)}</p>
      ${meta ? `<p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;color:#888888;margin:0 0 6px 0;">${meta}</p>` : ""}
      <p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;color:#888888;margin:0 0 14px 0;">&#128205; ${esc(p.location)}</p>
      <a href="${esc(p.url)}" style="display:inline-block;background:#E0882C;color:#FFFFFF;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:9px;font-weight:800;letter-spacing:1.5px;text-decoration:none;padding:8px 16px;border-radius:3px;text-transform:uppercase;">Zobraziť &#8594;</a>
    </td></tr>
  </table>`;
}

function buildGrid(properties: NewsletterProperty[]): string {
  const rows: string[] = [];
  for (let i = 0; i < properties.length; i += 2) {
    const left = properties[i];
    const right = properties[i + 1];
    rows.push(`<tr><td style="padding:0 20px 14px 20px;">
      <table cellpadding="0" cellspacing="0" border="0" width="560"><tr>
        <td width="274" style="vertical-align:top;padding-right:6px;height:1px;">${buildPropertyCard(left, i)}</td>
        <td width="274" style="vertical-align:top;padding-left:6px;height:1px;">${right ? buildPropertyCard(right, i + 1) : ""}</td>
      </tr></table>
    </td></tr>`);
  }
  return rows.join("");
}

export function generateNewsletterHTML(content: NewsletterContent, recipientEmail: string): string {
  const logoSrc = `data:image/png;base64,${LOGO_B64}`;
  const unsubscribeUrl = `/odhlasit?email=${encodeURIComponent(recipientEmail)}`;
  const tipIcon = TIP_ICONS[content.tip.type] || "&#128161;";
  const tipLabel = TIP_LABELS[content.tip.type] || "TIP";
  const count = content.properties.length;

  return `<!DOCTYPE html>
<html lang="sk">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(content.greeting)} — ZAJO Reality</title>
</head>
<body style="margin:0;padding:40px 0;background:#ECEAE5;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ECEAE5;padding:40px 0;">
<tr><td align="center">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:600px;box-shadow:0 4px 32px rgba(0,0,0,0.10);border-radius:12px;">

<!-- HEADER -->
<tr><td style="background:#FFFFFF;border-radius:12px 12px 0 0;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="background:linear-gradient(90deg,#E0882C 0%,#C97520 100%);height:4px;line-height:4px;font-size:4px;">&nbsp;</td></tr></table>
  <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="padding:22px 32px 20px 32px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
      <td style="vertical-align:middle;"><img src="${logoSrc}" alt="ZAJO Reality" width="144" height="140" style="display:block;width:72px;height:70px;border:0;"/></td>
      <td align="right" style="vertical-align:middle;"><span style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;color:#888888;letter-spacing:0.5px;">${content.edition}.&nbsp;vydanie&nbsp;&nbsp;·&nbsp;&nbsp;${esc(content.month)}</span></td>
    </tr></table>
  </td></tr></table>
  <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="border-bottom:1px solid #E3E1DC;font-size:0;line-height:0;">&nbsp;</td></tr></table>
</td></tr>

<!-- HERO -->
<tr><td style="background:#FFFFFF;padding:44px 32px 44px 32px;">
  <table cellpadding="0" cellspacing="0" border="0">
    <tr><td><p style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:10px;font-weight:800;color:#E0882C;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 18px 0;">&#9632;&nbsp; VÝBER DOPORUČENÝCH NEHNUTEĽNOSTÍ</p></td></tr>
    <tr><td>
      <h1 style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:34px;font-weight:800;color:#1C1917;margin:0 0 8px 0;line-height:1.15;letter-spacing:-0.5px;">${esc(content.greeting)},</h1>
      <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;"><tr><td style="background:#B8860B;height:2px;width:48px;border-radius:1px;font-size:0;line-height:0;">&nbsp;</td></tr></table>
    </td></tr>
    <tr><td><p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:15px;color:#555555;line-height:1.8;margin:0;max-width:460px;">${safeHtml(content.intro)}</p></td></tr>
  </table>
</td></tr>

<!-- TIP -->
<tr><td style="background:#FFFFFF;padding:32px 32px 36px 32px;border-top:1px solid #E3E1DC;">
  <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;"><tr>
    <td style="padding-right:10px;vertical-align:middle;font-size:18px;line-height:1;">${tipIcon}</td>
    <td style="vertical-align:middle;border-bottom:2px solid #E0882C;padding-bottom:2px;"><span style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:10px;font-weight:800;color:#E0882C;letter-spacing:2.5px;text-transform:uppercase;">${tipLabel}</span></td>
  </tr></table>
  <h2 style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:#1C1917;margin:0 0 14px 0;line-height:1.3;letter-spacing:-0.2px;">${esc(content.tip.title)}</h2>
  <div style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:14px;color:#555555;line-height:1.85;">${safeHtml(content.tip.body)}</div>
</td></tr>

<!-- PROPERTIES HEADER -->
<tr><td style="background:#F7F5F1;padding:28px 32px 16px 32px;border-top:1px solid #E3E1DC;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
    <td>
      <p style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:10px;font-weight:800;color:#E0882C;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 4px 0;">VÝBER NEHNUTEĽNOSTÍ</p>
      <h2 style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:#1C1917;margin:0;letter-spacing:-0.2px;">Najnovšie ponuky v Trenčíne</h2>
    </td>
    <td align="right" style="vertical-align:bottom;"><span style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;color:#888888;">${count} nehnuteľnost${count === 1 ? "" : count < 5 ? "i" : "í"}</span></td>
  </tr></table>
  <table cellpadding="0" cellspacing="0" border="0" style="margin-top:12px;"><tr><td style="background:#B8860B;height:2px;width:40px;border-radius:1px;font-size:0;line-height:0;">&nbsp;</td></tr></table>
</td></tr>

<!-- GRID -->
<tr><td style="background:#F7F5F1;padding-bottom:12px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    ${buildGrid(content.properties)}
  </table>
</td></tr>

<!-- CTA -->
<tr><td style="background:linear-gradient(135deg,#E0882C 0%,#C97520 100%);padding:40px 32px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td align="center">
    <h2 style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;color:#FFFFFF;margin:0 0 10px 0;line-height:1.3;">${esc(content.ctaText)}</h2>
    <p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:14px;color:rgba(255,255,255,0.85);margin:0 0 24px 0;line-height:1.65;">Máme stovky overených ponúk v Trenčíne a okolí.<br/>Zavolajte nám alebo prezrite celé portfólio.</p>
    <a href="${esc(content.ctaUrl)}" style="display:inline-block;background:#FFFFFF;color:#C97520;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;letter-spacing:1.5px;text-decoration:none;padding:14px 36px;border-radius:3px;text-transform:uppercase;">Zobraziť všetky ponuky</a>
  </td></tr></table>
</td></tr>

<!-- FOOTER -->
<tr><td style="background:#FFFFFF;border-top:1px solid #E3E1DC;padding:24px 32px 30px 32px;border-radius:0 0 12px 12px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr><td align="center" style="padding-bottom:14px;"><img src="${logoSrc}" alt="ZAJO Reality" width="96" height="94" style="display:block;margin:0 auto;width:48px;height:47px;border:0;"/></td></tr>
    <tr><td align="center" style="padding-bottom:14px;">
      <p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;color:#888888;margin:0 0 4px 0;line-height:1.9;">ZAJO Reality s.r.o.&nbsp;&nbsp;·&nbsp;&nbsp;Trenčín, Slovensko</p>
      <p style="margin:0;">
        <a href="mailto:zajac@zajoreality.sk" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;color:#E0882C;text-decoration:none;">zajac@zajoreality.sk</a>
        <span style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;color:#E3E1DC;">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        <a href="https://www.zajoreality.sk" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;color:#E0882C;text-decoration:none;">zajoreality.sk</a>
      </p>
    </td></tr>
    <tr><td style="border-top:1px solid #E3E1DC;padding-top:14px;">
      <p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;color:#BBBBBB;margin:0;text-align:center;line-height:2;">
        Tento email bol odoslaný na adresu <span style="color:#888888;">${esc(recipientEmail)}</span>.<br/>
        <a href="${unsubscribeUrl}" style="color:#888888;text-decoration:underline;">Odhlásiť sa z odberu</a>&nbsp;·&nbsp;
        <a href="https://www.zajoreality.sk/gdpr" style="color:#888888;text-decoration:underline;">Ochrana osobných údajov</a>
      </p>
    </td></tr>
  </table>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
